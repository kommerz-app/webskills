import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { isDevMode } from '@angular/core';
import { cloneDeep, isEqual } from '@webskills/ts-utils';
import { deepFreeze } from '../immutability/freeze.utils';

export enum Comparator {
  SIM = 'sim',
  NSIM = 'nsim',
  EQ = 'eq',
  NEQ = 'neq',
  LEQ = 'leq',
  LESS = 'less',
  GEQ = 'geq',
  GTR = 'gtr',
}

export interface PageParams {
  page: number;
  size: number;
}

export interface SortParams {
  sortColumn: string;
  sortDirection: 'asc' | 'desc' | '';
}

export type FilterParams =
  | {
      filterColumn: string;
      comparator: Comparator;
      filterValue: string;
    }
  | FilterParams[];

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
  params: RequestParams,
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
    distinctUntilChanged<RequestParams>(isEqual),
  );

  public get params(): RequestParams {
    return this._params$.getValue();
  }

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
