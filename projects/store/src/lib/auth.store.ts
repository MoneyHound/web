import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'api';
import { ToastService } from 'ui';
import { User, CreateUser, VerifyOTP } from 'models';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  // State signals
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _codeSent = signal(false);

  // Public readonly signals
  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly codeSent = this._codeSent.asReadonly();

  // Computed signals
  readonly isAuthenticated = computed(() => !!this._token());
  readonly userEmail = computed(() => this._user()?.email ?? null);

  constructor() {
    // Initialize token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this._token.set(storedToken);
    }
  }

  // Actions
  register(data: CreateUser): void {
    this._isLoading.set(true);

    this.authService.register(data).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data) {
          this._user.set(response.data);
          this.toastService.success('Registration successful! Please sign in.');
          this.router.navigate(['/sign-in']);
        } else {
          this.toastService.error(response.message ?? 'Registration failed');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Registration failed. Please try again.');
      },
    });
  }

  requestOtp(email: string): void {
    this._isLoading.set(true);

    this.authService.requestOtp(email).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success) {
          this._codeSent.set(true);
          this.toastService.success('Verification code sent to your email');
        } else {
          this.toastService.error(response.message ?? 'Failed to send code');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to send code. Please try again.');
      },
    });
  }

  verifyOtp(data: VerifyOTP): void {
    this._isLoading.set(false);

    this.authService.verifyOtp(data).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data?.token) {
          this._token.set(response.data.token);
          localStorage.setItem('token', response.data.token);
          this.toastService.success('Signed in successfully!');
          this.router.navigate(['/']);
        } else {
          this.toastService.error(response.message ?? 'Invalid code');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Invalid code. Please try again.');
      },
    });
  }

  logout(): void {
    this._user.set(null);
    this._token.set(null);
    this._codeSent.set(false);
    localStorage.removeItem('token');
    this.toastService.info('You have been signed out');
    this.router.navigate(['/sign-in']);
  }

  resetCodeSent(): void {
    this._codeSent.set(false);
  }
}