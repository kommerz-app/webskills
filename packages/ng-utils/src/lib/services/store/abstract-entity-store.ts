import { Directive } from '@angular/core';
import { AbstractStore } from './abstract-store';
import { isUndefined } from '@webskills/ts-utils';

type ID = string | null | undefined;

@Directive()
export abstract class AbstractEntityStore<
  T extends { id?: ID },
> extends AbstractStore<T[]> {
  insertEntity(value: T): void {
    this.update([...this.getInstant(), value]);
  }

  upsertEntity(value: T): void {
    if (isUndefined(value)) {
      throw new Error('entity must be defined');
    }

    const idx = this.getIdx(value.id);

    if (idx == -1) {
      this.insertEntity(value);
    } else {
      this.replaceValueAtIndex(value, idx);
    }
  }

  updateEntity(value: T): void {
    if (isUndefined(value)) {
      throw new Error('entity must be defined');
    }

    const idx = this.getIdx(value.id);

    if (idx == -1) {
      throw new Error('no such entity with id ' + value.id);
    }

    this.replaceValueAtIndex(value, idx);
  }

  private replaceValueAtIndex(value: T, idx: number) {
    this.update([
      ...this.getInstant().slice(0, idx),
      value,
      ...this.getInstant().slice(idx + 1),
    ]);
  }

  /**
   * @return false if entity with id was not found
   */
  deleteEntity(id: string): boolean {
    const idx = this.getIdx(id);

    if (idx == -1) {
      return false;
    }

    this.update([
      ...this.getInstant().slice(0, idx),
      ...this.getInstant().slice(idx + 1),
    ]);

    return true;
  }

  private getIdx(id: ID) {
    return this.getInstant().findIndex((v) => v.id === id);
  }
}
