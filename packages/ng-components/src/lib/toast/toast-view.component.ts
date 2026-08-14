import {
  afterNextRender,
  Component,
  inject,
  Injector,
  signal,
  viewChildren,
} from '@angular/core';
import { ToastMessage } from './toast';
import { ToastItemComponent } from './toast-item.component';

/**
 * Container that will be used to display a toast.
 */
@Component({
  selector: 'wsk-toast-view',
  template: `
    @for (item of items(); track item) {
      <wsk-toast-item
        [message]="item"
        (removed)="onRemoved(item)"
      ></wsk-toast-item>
    }
  `,

  imports: [ToastItemComponent],
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

  readonly items = signal<ToastMessage[]>([]);

  readonly itemComponents = viewChildren(ToastItemComponent);

  private readonly injector = inject(Injector);

  addToast(toast: ToastMessage): void {
    if (!toast.ttlSeconds) {
      toast.ttlSeconds = this.ttlSeconds;
    }

    this.items.update((items) => [toast, ...items]);

    // The surplus toasts can only be identified once the new one has been rendered.
    afterNextRender(() => this.checkChildren(), { injector: this.injector });
  }

  checkChildren(): void {
    // call remove on all items that shall disappear
    this.itemComponents()
      .slice(this.maxItems)
      .forEach((item) => item.remove());
  }

  /**
   * After the item disappeared (animation) it must be removed from the list of items.
   *
   * @param item the item was hidden/removed
   */
  onRemoved(item: ToastMessage): void {
    this.items.update((items) =>
      items.filter((candidate) => candidate !== item),
    );
  }
}
