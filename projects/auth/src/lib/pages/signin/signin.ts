import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MhButton, MhInput, MhFormGroup } from 'ui';
import { AuthStore } from 'store';

@Component({
  selector: 'auth-signin',
  imports: [ReactiveFormsModule, MhButton, MhInput, MhFormGroup],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class SignIn {
  private readonly authStore = inject(AuthStore);
  protected readonly registerRoute = signal('/register');
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Expose store signals to template
  readonly isLoading = this.authStore.isLoading;
  readonly codeSent = this.authStore.codeSent;

  onRequestCode(): void {
    if (this.form.get('email')?.invalid) {
      this.form.get('email')?.markAsTouched();
      return;
    }

    this.authStore.requestOtp(this.form.get('email')?.value ?? '');
  }

  onVerifyCode(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authStore.verifyOtp({
      email: this.form.get('email')?.value ?? '',
      code: this.form.get('code')?.value ?? '',
    });
  }
}