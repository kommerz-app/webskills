import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinutesPipe } from './minutes.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [MinutesPipe],
  exports: [MinutesPipe],
})
export class MinutesModule {}
