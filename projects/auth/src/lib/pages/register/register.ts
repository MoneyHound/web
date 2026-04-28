import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MhButton, MhInput, MhFormGroup } from 'ui';
import { AuthService } from 'api';
import { CreateUser } from 'models';

@Component({
  selector: 'auth-register',
  imports: [ReactiveFormsModule, MhButton, MhInput, MhFormGroup],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly signIn = signal('/sign-in');
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    organization: ['', [Validators.required, Validators.minLength(3)]],
  });

  isLoading = false;
  error: string | null = null;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = null;
    this.isLoading = true;

    const data = this.form.getRawValue() as CreateUser;
    this.authService.register(data).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.router.navigate(['/']);
        } else {
          this.error = response.message || 'Registration failed';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}