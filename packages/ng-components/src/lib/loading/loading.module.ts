import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { ProgressComponent } from './progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [CommonModule, MatProgressBarModule, MatSnackBarModule],
  declarations: [LoadingComponent, ProgressComponent],
  exports: [LoadingComponent],
  entryComponents: [ProgressComponent],
})
export class LoadingModule {}
