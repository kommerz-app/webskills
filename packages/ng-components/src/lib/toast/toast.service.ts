import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { ToastViewComponent } from './toast-view.component';
import { ToastMessage } from './toast';

/**
 * A Toast is a non modal, unobtrusive window element used to display brief,
 * auto-expiring windows of information to a user.
 * This service is responsible for rendering toast messages.
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly containerRef: ComponentRef<ToastViewComponent>;

  get toastView(): ToastViewComponent {
    return this.containerRef.instance;
  }

  constructor(private overlay: Overlay) {
    // -- create ToastView
    const overlayRef = this.overlay.create(this.getOverlayConfig());
    const containerPortal = new ComponentPortal(ToastViewComponent);
    this.containerRef = overlayRef.attach(containerPortal);
  }

  /**
   * Emit a new message.
   *
   * @param message message that is emitted
   */
  emitMessage(message: ToastMessage): void {
    if (this.containerRef) {
      this.toastView.addToast(message);
    }
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position().global().right().top();

    return new OverlayConfig({
      // hasBackdrop: config.hasBackdrop,
      // backdropClass: config.backdropClass,
      // panelClass: config.panelClass,
      // scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });
  }
}
