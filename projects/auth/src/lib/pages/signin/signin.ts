import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MhButton, MhInput, MhFormGroup } from 'ui';
import { AuthService } from 'api';

@Component({
  selector: 'auth-signin',
  imports: [ReactiveFormsModule, MhButton, MhInput, MhFormGroup],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class SignIn {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly signIn = signal('/register');
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6)]],
  });

  isLoading = false;
  error: string | null = null;
  codeSent = false;

  onRequestCode(): void {
    if (this.form.get('email')?.invalid) {
      this.form.get('email')?.markAsTouched();
      return;
    }

    this.error = null;
    this.isLoading = true;

    this.authService.requestOtp(this.form.get('email')?.value || '').subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.codeSent = true;
        } else {
          this.error = response.message || 'Failed to send code';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Failed to send code. Please try again.';
      },
    });
  }

  onVerifyCode(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = null;
    this.isLoading = true;

    this.authService
      .verifyOtp({
        email: this.form.get('email')?.value || '',
        code: this.form.get('code')?.value || '',
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success && response.data?.token) {
            localStorage.setItem('token', response.data.token);
            this.router.navigate(['/']);
          } else {
            this.error = response.message || 'Invalid code';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.error?.message || 'Invalid code. Please try again.';
        },
      });
  }
}