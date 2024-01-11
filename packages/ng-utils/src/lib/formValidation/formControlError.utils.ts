import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * remove FormControlError and the Error Object itself if empty
 *
 *  @param control FormControl which has the error
 *  @param errorName Name of Errorkey
 */
export function removeFormControlError(
  control: AbstractControl | null,
  errorName: string,
): void {
  if (control?.errors && control?.errors[errorName]) {
    delete control.errors[errorName];
    if (Object.keys(control.errors).length === 0) {
      control.setErrors(null);
    }
  }
}

/**
 * updates FormControlError
 *
 *  @param control FormControl which has the error
 *  @param errorName Name of Errorkey
 *  @param flag Boolean
 */
export function updateFormControlError(
  control: AbstractControl | null,
  errorName: string,
  flag: boolean,
): void {
  if (flag) {
    const error: ValidationErrors = control?.errors ?? {};
    error[errorName] = flag;
    control?.setErrors(error);
    control?.markAsTouched();
  } else {
    removeFormControlError(control, errorName);
  }
}
