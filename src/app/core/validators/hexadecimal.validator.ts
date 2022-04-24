import { AbstractControl } from "@angular/forms";

export function validateHexadecimalValue(control: AbstractControl) {
  const value = control.value;
  if(!value || !(/^#[0-9A-Fa-f]{6}$/i).test(value)) {
    return { invalidValue: true };
  }

  return null;
}
