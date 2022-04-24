import {FormGroup} from "@angular/forms";

export function validateEqualPasswords(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const passwordConfirm = formGroup.get('passwordConfirm')?.value;

  if(password !== passwordConfirm) {
    return { passwordsNotMatching: true };
  }

  return null;
}
