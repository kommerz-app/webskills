import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface MenuItem {
  label: string;
  icon: string;
  disabled: boolean;
  action: () => void;
}

@Component({
  selector: 'wsk-split-button',
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.scss'],
  standalone: false,
})
export class SplitButtonComponent {
  @Input() disabled!: boolean;
  @Input() items!: MenuItem[];
  @Input() type!: string;

  @Output() clickSubmit = new EventEmitter<any>();

  onSubmit(event: Event): void {
    this.clickSubmit.emit(event);
  }
}
