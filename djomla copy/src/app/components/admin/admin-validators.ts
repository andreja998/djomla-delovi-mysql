import { ValidationErrors, AbstractControl } from "@angular/forms";

export function usernameShouldBeValid(
  control: AbstractControl
): ValidationErrors | null {
  if ((control.value as string).indexOf(" ") >= 0) {
    return { shouldNotHaveSpaces: true };
  }

  // If there is no validation failure, return null
  return null;
}
export function ValidateUrl(control: AbstractControl) {
  if (!control.value.startsWith("https") || !control.value.includes(".io")) {
    return { validUrl: true };
  }
  return null;
}
