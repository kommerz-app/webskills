import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ToastMessage } from './toast';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'wsk-toast-item',
  template: `
    <div
      class="animation-container mt-3 mr-0 sm:mr-3 overflow-hidden rounded-sm mat-elevation-z3"
      [@showHide]="show ? 'show' : 'hide'"
      (@showHide.done)="onHideDone()"
    >
      <div class="content flex gap-2 p-3" [ngClass]="message.type!">
        <img
          *ngIf="message.avatar && message.type === 'notification'"
          src="{{ message.avatar }}"
          alt="Avatar"
          class="avatar h-8 w-8"
        />
        <div
          class="flex-auto"
          [ngClass]="{ 'flex items-center': message.type !== 'notification' }"
        >
          <div class="flex">
            <mat-icon class="icon-toast mr-2">{{ icon }}</mat-icon>
            <p class="toast-title-truncate text-sm">
              {{ message.messageTitle }}
            </p>
          </div>
          <p
            *ngIf="message.type === 'notification'"
            class="toast-subtitle-truncate pt-1 text-xs text-slate-600"
          >
            {{ message.subtitle }}
          </p>
          <div class="flex pt-2" *ngIf="message.type === 'notification'">
            <p class="notification-type text-slate-600 text-xs">
              {{ message.notificationType }}
            </p>
            <p class="!mr-3 text-slate-600 text-xs">{{ message.timestamp }}</p>
          </div>
        </div>
        <div class="close-button-container">
          <button
            mat-icon-button
            type="button"
            (click)="remove()"
            class="material-icons close-button primary-color"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('showHide', [
      state(
        'show',
        style({
          'max-height': '108px',
          opacity: 1,
        }),
      ),
      state(
        'hide',
        style({
          opacity: 0,
          'max-height': 0,
          margin: 0,
        }),
      ),
      transition('* => hide', [animate('0.2s')]),
      transition('* => show', [animate('0.2s')]),
    ]),
  ],
  styleUrls: ['./toast-item.component.scss'],
})
export class ToastItemComponent implements OnChanges {
  show = true;

  @Input() message!: ToastMessage;
  @Output() removed = new EventEmitter<void>();

  get icon(): string {
    if (!this.message) {
      return 'undefined';
    }

    switch (this.message.type) {
      case 'error':
        return 'report_problem';
      case 'warn':
        return 'info';
      case 'success':
        return 'done';
      case 'notification':
        return 'priority_high';
    }

    return 'undefined';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message && this.message.autoHide !== false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setTimeout(() => this.remove(), this.message.ttlSeconds! * 1000);
    }
  }

  remove(): void {
    this.show = false;
  }

  onHideDone(): void {
    if (!this.show) {
      this.removed.emit();
    }
  }
}
