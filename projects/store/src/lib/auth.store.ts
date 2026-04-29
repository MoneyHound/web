import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'api';
import { ToastService, PopupService } from 'ui';
import { User, CreateUser, VerifyOTP, UpdateProfile } from 'models';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly popupService = inject(PopupService);

  // State signals
  private readonly _user = signal<User | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _codeSent = signal(false);
  private readonly _isLoadingGoogle = signal(false);

  // Public readonly signals
  readonly user = this._user.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly codeSent = this._codeSent.asReadonly();
  readonly isLoadingGoogle = this._isLoadingGoogle.asReadonly();

  // Computed signals
  readonly isAuthenticated = computed(() => !!this._user());
  readonly userEmail = computed(() => this._user()?.email ?? null);

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
    this._isLoading.set(true);

    this.authService.verifyOtp(data).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success) {
          this.toastService.success('Signed in successfully!');
          this.fetchProfile();
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

  fetchProfile(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this._user.set(response.data);
        }
      },
    });
  }

  updateProfile(data: UpdateProfile): void {
    this._isLoading.set(true);

    this.authService.updateProfile(data).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data) {
          this._user.set(response.data);
          this.toastService.success('Profile updated successfully');
        } else {
          this.toastService.error(response.message ?? 'Update failed');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Update failed. Please try again.');
      },
    });
  }

  deleteProfile(): void {
    this._isLoading.set(true);

    this.authService.deleteProfile().subscribe({
      next: () => {
        this._isLoading.set(false);
        this._user.set(null);
        this._codeSent.set(false);
        this.toastService.info('Account deleted');
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to delete account');
      },
    });
  }

  logout(): void {
    this._user.set(null);
    this._codeSent.set(false);
    this.toastService.info('You have been signed out');
    this.router.navigate(['/sign-in']);
  }

  resetCodeSent(): void {
    this._codeSent.set(false);
  }

  googleLogin(): void {
    this._isLoadingGoogle.set(true);
    window.location.href = "http://localhost:8080/auth/google/login"
  }
}