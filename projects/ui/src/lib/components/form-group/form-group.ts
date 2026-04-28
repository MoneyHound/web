import { Component, input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MhLabel } from '../label/label';

export interface ErrorMessages {
  required?: string;
  email?: string;
  minlength?: string;
  maxlength?: string;
  pattern?: string;
  min?: string;
  max?: string;
}

@Component({
  selector: 'mh-form-group',
  imports: [MhLabel],
  templateUrl: './form-group.html',
  styleUrl: './form-group.scss',
  host: {
    class: 'mh-form-group',
  },
})
export class MhFormGroup {
  readonly label = input.required<string>();
  readonly for = input.required<string>();
  readonly control = input<AbstractControl | null>(null);
  readonly errors = input<ErrorMessages>({});

  get showError(): boolean {
    const ctrl = this.control();
    return !!(ctrl?.touched && ctrl?.invalid);
  }

  get errorMessage(): string | null {
    const ctrl = this.control();
    if (!ctrl?.errors) return null;

    const errorKeys = Object.keys(ctrl.errors);
    if (errorKeys.length === 0) return null;

    const errorKey = errorKeys[0];
    const customMessage = this.errors()[errorKey as keyof ErrorMessages];
    if (customMessage) return customMessage;

    // Default messages
    switch (errorKey) {
      case 'required':
        return 'This field is required';
      case 'email':
        return 'Please enter a valid email';
      case 'minlength':
        const minLen = ctrl.errors['minlength']?.requiredLength;
        return `Minimum ${minLen} characters required`;
      case 'maxlength':
        const maxLen = ctrl.errors['maxlength']?.requiredLength;
        return `Maximum ${maxLen} characters allowed`;
      case 'pattern':
        return 'Invalid format';
      case 'min':
        return `Minimum value is ${ctrl.errors['min']?.min}`;
      case 'max':
        return `Maximum value is ${ctrl.errors['max']?.max}`;
      default:
        return 'Invalid value';
    }
  }
}