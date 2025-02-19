import { Component, QueryList, ViewChildren } from '@angular/core';
import { ToastMessage } from './toast';
import { ToastItemComponent } from './toast-item.component';

/**
 * Container that will be used to display a toast.
 */
@Component({
  selector: 'wsk-toast-view',
  template: `
    @for (item of items; track item) {
      <wsk-toast-item
        [message]="item"
        (removed)="onRemoved(item)"
      ></wsk-toast-item>
    }
  `,
  standalone: false,
})
export class ToastViewComponent {
  /**
   * max number of toasts that shall be displayed
   */
  maxItems = 5;

  /**
   * number of seconds until an toast is removed automatically
   */
  ttlSeconds = 5;

  items: ToastMessage[] = [];

  @ViewChildren(ToastItemComponent)
  itemComponents!: QueryList<ToastItemComponent>;

  addToast(toast: ToastMessage): void {
    if (!toast.ttlSeconds) {
      toast.ttlSeconds = this.ttlSeconds;
    }

    this.items.unshift(toast);

    setTimeout(() => this.checkChildren());
  }

  checkChildren(): void {
    // call remove on all items that shall disappear
    this.itemComponents
      .toArray()
      .slice(this.maxItems)
      .forEach((i) => i.remove());
  }

  /**
   * After the item disappeared (animation) it must be removed from the list of items.
   *
   * @param item the item was hidden/removed
   */
  onRemoved(item: ToastMessage): void {
    const idx = this.items.findIndex((i) => i === item);
    if (idx > -1) {
      this.items.splice(idx, 1);
    }
  }
}
