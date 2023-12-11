import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './loading.directive';
import { LoadingComponent } from './loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventLoadingDirective } from './event-loading.directive';

@NgModule({
  declarations: [LoadingDirective, LoadingComponent, EventLoadingDirective],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingDirective, EventLoadingDirective],
})
export class LoadingModule {}
