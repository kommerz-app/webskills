import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainsPipe } from './contains.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ContainsPipe],
  exports: [ContainsPipe],
})
export class ContainsModule {}
