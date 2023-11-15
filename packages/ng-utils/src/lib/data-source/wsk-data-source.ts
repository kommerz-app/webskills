import { isUndefined } from '@webskills/ts-utils';
import {
  Page,
  PageParams,
  PaginationEndpoint,
  RequestParams,
} from './data-source.model';
import { AbstractWskDataSource } from './abstract-wsk-data-source';

export class WskDataSource<T> extends AbstractWskDataSource<T> {
  constructor(
    protected readonly cb: PaginationEndpoint<T>,
    defaultRequestParams?: RequestParams,
  ) {
    super();

    if (defaultRequestParams) {
      this.requestParams.updateParam(defaultRequestParams);
    }
  }

  public override reload(): void {
    this.load$.next();
  }

  protected override buildPageParams(
    params: RequestParams,
  ): PageParams | undefined {
    return params.pageParams;
  }

  protected override storeNewData(_mode: string, page: Page<T>) {
    this._data$.next(page.content);
  }

  public override hasMore(): boolean {
    if (isUndefined(this.requestParams.params.pageParams)) {
      return false;
    }

    const { page, size } = this.requestParams.params.pageParams;

    return (page + 1) * size < this.totalElements;
  }

  protected onRequestParamsChange(): void {
    // nop
  }
}
