import { Directive, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { deepFreeze } from '../../immutability/freeze.utils';
import { isDefined } from '@webskills/ts-utils';

@Directive()
export abstract class AbstractStore<T> implements OnDestroy {
  private _value$: BehaviorSubject<T>;

  public get value$(): Observable<T> {
    return this._value$.asObservable();
  }

  protected constructor(initialValue: T) {
    this._value$ = new BehaviorSubject<T>(initialValue);
  }

  update(value: T): void {
    if (isDevMode() && isDefined(value)) {
      value = deepFreeze(value);
    }
    this._value$.next(value);
  }

  getInstant(): T {
    return this._value$.getValue();
  }

  ngOnDestroy(): void {
    this._value$.complete();
  }
}
