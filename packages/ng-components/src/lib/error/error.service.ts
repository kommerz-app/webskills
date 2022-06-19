import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
