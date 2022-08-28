import { Directive } from '@angular/core';
import { AbstractStore } from './abstract-store';
import { isUndefined } from '@webskills/ts-utils';

@Directive()
export abstract class AbstractEntityStore<
  T extends { id: string | null | undefined }
> extends AbstractStore<T[]> {
  insertEntity(value: T): void {
    this.update([...this.getInstant(), value]);
  }

  updateEntity(value: T): void {
    if (isUndefined(value)) {
      throw new Error('entity must be defined');
    }

    const idx = this.getInstant().findIndex((v) => v.id === value.id);

    if (idx == -1) {
      throw new Error('no such entity with id ' + value.id);
    }

    this.update([
      ...this.getInstant().slice(0, idx),
      value,
      ...this.getInstant().slice(idx + 1),
    ]);
  }

  deleteEntity(id: string): void {
    const idx = this.getInstant().findIndex((v) => v.id === id);

    if (idx == -1) {
      throw new Error('no such entity with id ' + id);
    }

    this.update([
      ...this.getInstant().slice(0, idx),
      ...this.getInstant().slice(idx + 1),
    ]);
  }
}
