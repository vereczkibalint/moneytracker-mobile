import { AbstractControl } from "@angular/forms";

export function validateCurrency(control: AbstractControl) {
  const CURRENCIES = ['HUF', 'EUR', 'USD'];

  const value = control.value;
  if(!CURRENCIES.includes(value)) {
    return { invalidCurrency: true };
  }
  return null;
}
