import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitButtonComponent } from './split-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  declarations: [SplitButtonComponent],
  exports: [SplitButtonComponent],
})
export class SplitButtonModule {}
