import {
  FilterParams,
  Page,
  PageParams,
  PaginationEndpoint,
  SortParams,
} from './data-source.model';
import { AbstractWskDataSource } from './abstract-wsk-data-source';

export interface LazyRequestParams {
  sortParams?: SortParams[];
  filterParams?: FilterParams[];
}

export class WskLazyDataSource<T> extends AbstractWskDataSource<T> {
  /**
   * number of items that are loaded in the next request / have been loaded in the last request
   */
  private requestSize;
  private offset = 0;

  constructor(
    protected readonly cb: PaginationEndpoint<T>,
    defaultRequestParams?: LazyRequestParams,
    private readonly batchSize = 15,
  ) {
    super();

    this.requestSize = batchSize;

    if (defaultRequestParams) {
      this.requestParams.updateParam(defaultRequestParams);
    }
  }

  public override hasMore() {
    return this.totalElements > this.data.length;
  }

  /**
   * Reload current page
   */
  public override reload(): void {
    this.requestSize = this.offset + this.requestSize;
    this.offset = 0;

    this.load$.next('replace');
  }

  protected override storeNewData(mode: string, page: Page<T>) {
    if (mode === 'append') {
      this._data$.next([...this.data, ...(<Page<T>>page).content]);
    } else if (mode === 'replace') {
      this._data$.next((<Page<T>>page).content);
    }
  }

  protected override buildPageParams(): PageParams {
    return {
      page: this.offset / this.requestSize,
      size: this.requestSize,
    };
  }

  public appendNextPage(): void {
    if (!this.hasMore()) {
      return;
    }
    if (this._loading$.getValue()) {
      return;
    }
    this.offset = this.offset + this.requestSize;
    this.requestSize = this.batchSize;

    this.load$.next('append');
  }

  protected onRequestParamsChange(): void {
    this.requestSize = this.batchSize;
    this.offset = 0;
    this._data$.next([]);
  }
}
