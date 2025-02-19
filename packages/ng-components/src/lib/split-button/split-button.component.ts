import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

export interface MenuItem {
  label: string;
  icon: string;
  disabled: boolean;
  action: () => void;
}

@Component({
  selector: 'wsk-split-button',
  templateUrl: './split-button.component.html',

  imports: [MatButton, MatMenuTrigger, MatMenu, MatIcon, MatMenuItem],
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
