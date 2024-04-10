import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value as string;

    // Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    const valid = regex.test(password);

    return valid ? null : { 'passwordInvalid': true };
  };
}

@Directive({
  selector: '[passwordRegexValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordRegexValidatorDirective, multi: true }]
})
export class PasswordRegexValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordValidator()(control);
  }
}
