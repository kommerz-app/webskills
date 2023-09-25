import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  Page,
  PageParams,
  PaginationEndpoint,
  RequestParams,
  RequestParamsHolder,
} from './data-source.model';
import { isDefined } from '@webskills/ts-utils';

export abstract class AbstractWskDataSource<T> extends DataSource<T> {
  protected abstract readonly cb: PaginationEndpoint<T>;

  protected readonly _destroy$ = new Subject<void>();
  protected readonly load$ = new Subject<string | void>();
  protected readonly _data$ = new BehaviorSubject<T[]>([]);

  public readonly data$ = this._data$.pipe(takeUntil(this._destroy$));
  public readonly destroy$ = this._destroy$.asObservable();

  protected readonly _totalElements$ = new BehaviorSubject<number>(0);

  /**
   * Stream of current amount of all available elements.
   */
  public readonly totalElements$ = this._totalElements$.pipe(
    takeUntil(this.destroy$)
  );

  protected readonly _loading$ = new BehaviorSubject<boolean>(false);

  /**
   * data is requested
   */
  public readonly loading$ = this._loading$.pipe(takeUntil(this.destroy$));

  public get totalElements(): number {
    return this._totalElements$.value;
  }

  public get data(): T[] {
    return this._data$.value;
  }

  public abstract hasMore(): boolean;

  private _requestParams: RequestParamsHolder = new RequestParamsHolder();

  get requestParams(): RequestParamsHolder {
    return this._requestParams;
  }

  /**
   * Reload current page
   */
  public abstract reload(): void;

  connect(): Observable<T[] | ReadonlyArray<T>> {
    return combineLatest([
      this.load$.pipe(startWith('replace')),
      this.requestParams.params$.pipe(
        tap((params) => this.onRequestParamsChange(params))
      ),
    ]).pipe(
      takeUntil(this.destroy$),
      tap(() => this._loading$.next(true)),
      switchMap(([mode, params]) =>
        this.cb({
          ...params,
          pageParams: this.buildPageParams(params),
        }).pipe(
          tap({
            next: () => this._loading$.next(false),
            error: () => this._loading$.next(false),
          }),
          catchError(() => of(void 0)),
          filter((ret) => isDefined(ret)),
          map((ret) => [mode, ret])
        )
      ),
      tap(([mode, page]) => {
        this._totalElements$.next((<Page<T>>page).totalElements);
        this.storeNewData(<string>mode, <Page<T>>page);
      }),
      map(() => this.data)
    );
  }

  protected abstract buildPageParams(
    params: RequestParams
  ): PageParams | undefined;

  protected abstract storeNewData(mode: string, page: Page<T>): void;

  protected abstract onRequestParamsChange(params: RequestParams): void;

  disconnect(): void {
    this._destroy$.next();
    this._destroy$.complete();

    this._requestParams.destroy();
  }
}
