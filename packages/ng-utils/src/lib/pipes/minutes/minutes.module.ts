import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinutesPipe } from './minutes.pipe';
import { DurationMinutesPipe } from './duration-minutes.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [MinutesPipe, DurationMinutesPipe],
  exports: [MinutesPipe, DurationMinutesPipe],
})
export class MinutesModule {}
