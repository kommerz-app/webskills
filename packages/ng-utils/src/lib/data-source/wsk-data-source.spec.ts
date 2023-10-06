// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  FilterParams,
  Page,
  PageParams,
  PaginationEndpoint,
  SortParams,
  WskDataSource,
} from './wsk-data-source';
import { forkJoin, of, Subject, throwError } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface Address {
  building_id?: string;
}

describe('ColDataSource', () => {
  const page: Page<Address> = {
    content: [
      {
        building_id: '123',
      },
      {
        building_id: '123',
      },
      {
        building_id: '123',
      },
    ],
    totalElements: 3,
    // pageNumber: 1,
    // pageSize: 10,
  };

  it('should set page params', (done) => {
    let counter = 0;

    const cb: PaginationEndpoint<Address> = ({ pageParams }) => {
      if (counter === 0) {
        expect(pageParams).toBe(undefined);
      } else {
        expect(pageParams.size).toBe(15);
        expect(pageParams.page).toBe(3);
        done();
      }

      counter++;
      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb);
    dataSource.connect(undefined).subscribe();

    const pageParams: PageParams = { page: 3, size: 15 };
    dataSource.requestParams.updateParam({ pageParams });
  });

  it('should set sort params', (done) => {
    let counter = 0;

    const cb: PaginationEndpoint<Address> = ({ sortParams }) => {
      if (counter === 0) {
        expect(sortParams).toBe(undefined);
      } else {
        expect(sortParams[0].sortColumn).toBe('street');
        expect(sortParams[0].sortDirection).toBe('asc');
        done();
      }

      counter++;
      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb);
    dataSource.connect(undefined).subscribe();

    const sortParams: SortParams[] = [
      { sortColumn: 'street', sortDirection: 'asc' },
    ];
    dataSource.requestParams.updateParam({ sortParams });
  });

  it('should set filter params', (done) => {
    let counter = 0;

    const cb: PaginationEndpoint<Address> = ({ filterParams }) => {
      if (counter === 0) {
        expect(filterParams).toBe(undefined);
      } else {
        expect(filterParams[0].filterColumn).toBe('zip');
        expect(filterParams[0].comparator).toBe('eq');
        expect(filterParams[0].filterValue).toBe('22305');
        done();
      }

      counter++;
      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb);
    dataSource.connect(undefined).subscribe();

    const filterParams: FilterParams[] = [
      { filterColumn: 'zip', comparator: 'eq', filterValue: '22305' },
    ];
    dataSource.requestParams.updateParam({ filterParams });
  });

  it('should set sort params and keep page params', (done) => {
    const cb: PaginationEndpoint<Address> = () => {
      expect(pageParams.size).toBe(15);
      expect(pageParams.page).toBe(3);
      expect(sortParams[0].sortColumn).toBe('street');
      expect(sortParams[0].sortDirection).toBe('asc');

      done();
      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb);

    const pageParams: PageParams = { page: 3, size: 15 };
    const sortParams: SortParams[] = [
      { sortColumn: 'street', sortDirection: 'asc' },
    ];
    dataSource.requestParams.updateParam({ sortParams });
    dataSource.requestParams.updateParam({ pageParams });

    dataSource.connect(undefined).subscribe();
  });

  it('should set params', (done) => {
    let counter = 0;

    const cb: PaginationEndpoint<Address> = ({
      pageParams,
      sortParams,
      filterParams,
    }) => {
      if (counter === 0) {
        expect({ pageParams, sortParams, filterParams }).toEqual({
          pageParams: undefined,
          sortParams: undefined,
          filterParams: undefined,
        });
      } else {
        expect(pageParams.size).toBe(15);
        expect(pageParams.page).toBe(3);
        expect(sortParams[0].sortColumn).toBe('street');
        expect(sortParams[0].sortDirection).toBe('asc');
        expect(filterParams[0].filterColumn).toBe('zip');
        expect(filterParams[0].comparator).toBe('eq');
        expect(filterParams[0].filterValue).toBe('22305');
        done();
      }

      counter++;
      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb);
    dataSource.connect(undefined).subscribe();

    const pageParams: PageParams = { page: 3, size: 15 };
    const sortParams: SortParams[] = [
      { sortColumn: 'street', sortDirection: 'asc' },
    ];
    const filterParams: FilterParams[] = [
      { filterColumn: 'zip', comparator: 'eq', filterValue: '22305' },
    ];
    dataSource.requestParams.updateParam({
      pageParams,
      sortParams,
      filterParams,
    });
  });

  it('should set right amount of totalElements', (done) => {
    let counter = 0;

    const cb: PaginationEndpoint<Address> = () => {
      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb);

    dataSource.totalElements$.subscribe((elements) => {
      if (counter === 0) {
        expect(elements).toBe(0);
      } else {
        expect(elements).toBe(3);
        done();
      }
      counter++;
    });

    dataSource.connect(undefined).subscribe();
  });

  it('should return data after connect', (done) => {
    let counter = 0;

    const cb: PaginationEndpoint<Address> = () => {
      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb);

    const expectedData = [
      {
        building_id: '123',
      },
      {
        building_id: '123',
      },
      {
        building_id: '123',
      },
    ];

    dataSource.connect(undefined).subscribe((data) => {
      if (counter === 0) {
        expect(data).toEqual(expectedData);
      } else {
        expect(data).toEqual(expectedData);
        done();
      }
      counter++;
    });

    const pageParams: PageParams = { page: 3, size: 15 };
    dataSource.requestParams.updateParam({ pageParams });
  });

  it('should use default request params if specified', (done) => {
    const pageParams: PageParams = { page: 3, size: 15 };
    const sortParams: SortParams[] = [
      { sortColumn: 'street', sortDirection: 'asc' },
    ];
    const filterParams: FilterParams[] = [
      { filterColumn: 'zip', comparator: 'eq', filterValue: '22305' },
    ];

    const cb: PaginationEndpoint<Address> = ({
      pageParams,
      sortParams,
      filterParams,
    }) => {
      expect(pageParams.size).toBe(15);
      expect(pageParams.page).toBe(3);

      expect(sortParams[0].sortColumn).toBe('street');
      expect(sortParams[0].sortDirection).toBe('asc');

      expect(filterParams[0].filterColumn).toBe('zip');
      expect(filterParams[0].filterValue).toBe('22305');

      done();

      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb, {
      pageParams,
      sortParams,
      filterParams,
    });
    dataSource.connect(null).subscribe();
  });

  it('should load after pagination ep failed once', (done) => {
    let counter = 0;
    const cb: PaginationEndpoint<Address> = () => {
      if (counter === 0) {
        counter++;
        return throwError('ep error');
      }

      return of(page);
    };

    const dataSource = new WskDataSource<Address>(cb);

    dataSource.connect(null).subscribe((data) => {
      expect(data.length).toBe(3);
      done();
    });

    dataSource.reload();
  });

  it('should indicate loading state', async () => {
    const wait$ = new Subject();

    const cb: PaginationEndpoint<Address> = () => {
      return forkJoin([of(page), wait$]).pipe(map(([page]) => page));
    };

    const dataSource = new WskDataSource<Address>(cb);

    const loading = await dataSource.loading$.pipe(take(1)).toPromise();
    expect(loading).toBeFalsy();

    dataSource.connect(null).subscribe();

    const loading2 = await dataSource.loading$.pipe(take(1)).toPromise();
    expect(loading2).toBeTruthy();

    wait$.next(null);
    wait$.complete();

    const loading3 = await dataSource.loading$.pipe(take(1)).toPromise();
    expect(loading3).toBeFalsy();
  });

  it('should reset loading state when ep fails', async () => {
    const cb: PaginationEndpoint<Address> = () => {
      return throwError('error on ep');
    };

    const dataSource = new WskDataSource<Address>(cb);
    dataSource.connect(null).subscribe();

    const loading = await dataSource.loading$.pipe(take(1)).toPromise();
    expect(loading).toBeFalsy();
  });

  it('should not reload when request params have same value after update', (done) => {
    const cb: PaginationEndpoint<Address> = () => {
      return of(page);
    };

    let counter = 0;
    const dataSource = new WskDataSource<Address>(cb, {
      pageParams: { page: 7, size: 11 },
    });
    dataSource.connect(null).subscribe({
      next: () => counter++,
      complete: () => {
        expect(counter).toBe(2);
        done();
      },
    });

    dataSource.requestParams.updateParam({ pageParams: { page: 7, size: 11 } });
    dataSource.requestParams.updateParam({ pageParams: { page: 6, size: 11 } });
    dataSource.disconnect(null);
  });

  it('should reload when request params have changed', (done) => {
    const cb: PaginationEndpoint<Address> = () => {
      return of(page);
    };

    let counter = 0;
    const dataSource = new WskDataSource<Address>(cb, {
      pageParams: { page: 7, size: 11 },
    });
    dataSource.connect(null).subscribe({
      next: () => counter++,
      complete: () => {
        expect(counter).toBe(5);
        done();
      },
    });

    // should be ignored
    dataSource.requestParams.updateParam({ pageParams: { page: 7, size: 11 } });

    dataSource.requestParams.updateParam({
      filterParams: [{ filterColumn: 'a', comparator: 'eq', filterValue: 'b' }],
    });

    // should be ignored
    dataSource.requestParams.updateParam({
      filterParams: [{ filterColumn: 'a', comparator: 'eq', filterValue: 'b' }],
    });

    dataSource.requestParams.updateParam({
      filterParams: [{ filterColumn: 'a', comparator: 'eq', filterValue: 'd' }],
    });
    dataSource.requestParams.updateParam({
      filterParams: [{ filterColumn: 'a', comparator: 'eq', filterValue: 'e' }],
    });
    dataSource.requestParams.updateParam({
      filterParams: [{ filterColumn: 'a', comparator: 'eq', filterValue: 'f' }],
    });

    dataSource.disconnect(null);
  });
});
