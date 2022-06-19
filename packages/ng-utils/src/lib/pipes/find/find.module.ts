import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindPipe } from './find.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FindPipe],
  exports: [FindPipe],
})
export class FindModule {}
