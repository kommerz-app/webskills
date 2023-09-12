import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastViewComponent } from './toast-view.component';
import { ToastItemComponent } from './toast-item.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [ToastViewComponent, ToastItemComponent],
  exports: [ToastViewComponent],
})
export class ToastModule {}
