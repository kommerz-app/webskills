import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  removeFormControlError,
  updateFormControlError,
} from './formControlError.utils';

describe('FormControlErrorUtils', () => {
  it('should remove FormControlError and ErrorObject if empty', () => {
    const formGroupMock = new FormGroup({
      formName: new FormControl('', [Validators.required, Validators.min(8)]),
    });

    const input = <AbstractControl>formGroupMock.get('formName');
    expect(input.errors?.['required']).toBeTruthy();

    input.setValue('Test');

    removeFormControlError(input, 'min');
    removeFormControlError(input, 'required');
    expect(input.errors?.['min']).toBeFalsy();
    expect(input.errors?.['required']).toBeFalsy();
  });
});

describe('FormControlErrorUtils', () => {
  it('should update FormControl error', () => {
    const formGroupMock = new FormGroup({
      formName: new FormControl('', [Validators.required, Validators.min(8)]),
    });

    const input = <AbstractControl>formGroupMock.get('formName');
    expect(input.errors?.['required']).toBeTruthy();

    input.setValue('TestFormName');
    expect(input.errors?.['required']).toBeFalsy();

    updateFormControlError(input, 'min', true);
    expect(input.errors?.['min']).toBeTruthy();

    updateFormControlError(input, 'min2', true);
    expect(input.errors?.['min']).toBeTruthy();
    expect(input.errors?.['min2']).toBeTruthy();
  });
});
