import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { isDevMode } from '@angular/core';
import { cloneDeep, isDefined, isEqual } from '@webskills/ts-utils';

export interface PageParams {
  page: number;
  size: number;
}

export interface SortParams {
  sortColumn: string;
  sortDirection: 'asc' | 'desc' | '';
}

export interface FilterParams {
  filterColumn: string;
  comparator?: 'eq' | 'neq' | 'less' | 'greater';
  filterValue: string;
}

export interface RequestParams {
  pageParams?: PageParams;
  sortParams?: SortParams[];
  filterParams?: FilterParams[];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
}

export type PaginationEndpoint<T> = (
  params: RequestParams
) => Observable<Page<T>>;

/**
 * Store that hold the active requests parameters for a table.
 */
export class RequestParamsHolder {
  private destroy$ = new Subject();

  private _params$ = new BehaviorSubject<RequestParams>({
    pageParams: undefined,
    filterParams: undefined,
    sortParams: undefined,
  });
  public params$ = this._params$.pipe(
    takeUntil(this.destroy$),
    distinctUntilChanged<RequestParams>(isEqual)
  );

  /**
   * Update/patch specified params. All other params remain untouched.
   * In order to remove params, they must be provided with the value 'undefined'
   *
   * @param params to be updated
   */
  updateParam(params: RequestParams): void {
    const value = {
      ...this._params$.getValue(),
      ...cloneDeep(params),
    };

    this._params$.next(isDevMode() ? deepFreeze(value) : value);
  }

  destroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

function deepFreeze<T>(obj: T) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = (obj as never)[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

export class WskDataSource<T> extends DataSource<T> {
  private destroy$ = new Subject<void>();
  private load$ = new Subject<void>();

  private _data$ = new BehaviorSubject<T[]>([]);
  public data$ = this._data$.pipe(takeUntil(this.destroy$));

  private _totalElements$ = new BehaviorSubject<number>(0);

  /**
   * Stream of current amount of all available elements.
   */
  public totalElements$ = this._totalElements$.pipe(takeUntil(this.destroy$));

  private _loading$ = new BehaviorSubject<boolean>(false);

  /**
   * data is requested
   */
  public loading$ = this._loading$.pipe(takeUntil(this.destroy$));

  public get totalElements(): number {
    return this._totalElements$.value;
  }

  public get data(): T[] {
    return this._data$.value;
  }

  constructor(
    private cb: PaginationEndpoint<T>,
    defaultRequestParams?: RequestParams
  ) {
    super();

    if (defaultRequestParams) {
      this.requestParams.updateParam(defaultRequestParams);
    }
  }

  private _requestParams: RequestParamsHolder = new RequestParamsHolder();

  get requestParams(): RequestParamsHolder {
    return this._requestParams;
  }

  /**
   * Reload current page
   */
  reload(): void {
    this.load$.next();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<T[] | ReadonlyArray<T>> {
    return combineLatest([
      this.load$.pipe(startWith(<unknown>null)),
      this.requestParams.params$,
    ]).pipe(
      takeUntil(this.destroy$),
      tap(() => this._loading$.next(true)),
      switchMap(([, params]) =>
        this.cb(params).pipe(
          tap({
            next: () => this._loading$.next(false),
            error: () => this._loading$.next(false),
          }),
          catchError(() => of(void 0)),
          filter((ret) => isDefined(ret))
        )
      ),
      tap((page) => {
        this._totalElements$.next((<Page<T>>page).totalElements);
        this._data$.next((<Page<T>>page).content);
      }),
      map((page) => (<Page<T>>page).content)
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.destroy$.next();
    this.destroy$.complete();

    this._requestParams.destroy();
  }
}
