import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClazzDirective } from './clazz.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ClazzDirective],
  exports: [ClazzDirective],
})
export class ClazzModule {}
