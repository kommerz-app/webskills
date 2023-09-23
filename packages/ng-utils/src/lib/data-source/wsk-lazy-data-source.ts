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
  private requestSize;
  private offset = 0;

  constructor(
    protected cb: PaginationEndpoint<T>,
    defaultRequestParams?: LazyRequestParams,
    private batchSize = 15
  ) {
    super();

    this.requestSize = batchSize;

    if (defaultRequestParams) {
      this.requestParams.updateParam(defaultRequestParams);
    }
  }

  public override hasMore() {
    return this.totalElements > this.offset + this.batchSize;
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
    this.offset = this.offset + this.batchSize;
    this.requestSize = this.batchSize;

    this.load$.next('append');
  }
}
