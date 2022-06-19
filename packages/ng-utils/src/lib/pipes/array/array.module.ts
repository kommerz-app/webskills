import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFromArrayPipe } from './select-from-array.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SelectFromArrayPipe],
  exports: [SelectFromArrayPipe],
})
export class ArrayModule {}
