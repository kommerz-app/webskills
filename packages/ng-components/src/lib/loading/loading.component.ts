import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ProgressComponent } from './progress.component';

@Component({
  selector: 'wsk-loading',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit, OnDestroy {
  private ref!: MatSnackBarRef<ProgressComponent>;

  constructor(private matSnackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.ref = this.matSnackBar.openFromComponent(ProgressComponent);
  }

  ngOnDestroy(): void {
    this.ref.dismiss();
  }
}
