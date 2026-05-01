import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from 'store';
import { DatePipe } from '@angular/common';
import { PopupService, MhButton, MhFormGroup, MhInput, MhOtpInput } from 'ui';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, ReactiveFormsModule, MhButton, MhFormGroup, MhInput, MhOtpInput],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  private readonly popupService = inject(PopupService);

  readonly isEditing = signal(false);
  readonly isLoading = this.authStore.isLoading;
  readonly codeSent = this.authStore.codeSent;
  readonly resendWait = this.authStore.resendWait;
  readonly emailChanged = signal(false);
  readonly originalEmail = signal('');

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    organization: ['', [Validators.minLength(3)]],
    code: ['', [Validators.minLength(6)]],
  });

  constructor() {
    this.form.get('email')?.valueChanges.subscribe((value) => {
      this.emailChanged.set(value !== this.originalEmail());
    });
  }

  toggleEdit(): void {
    if (this.isEditing()) {
      this.authStore.resetCodeSent();
      this.isEditing.set(false);
      return;
    }

    const user = this.authStore.user();
    const email = user?.email ?? '';
    this.originalEmail.set(email);
    this.emailChanged.set(false);
    this.form.patchValue({
      email,
      organization: user?.organization ?? '',
      code: '',
    });
    this.authStore.resetCodeSent();
    this.isEditing.set(true);
  }

  onRequestCode(): void {
    const email = this.authStore.user()?.email;
    if (!email) return;
    this.authStore.requestOtp(email);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.emailChanged() && !this.codeSent()) return;

    const { email, organization, code } = this.form.getRawValue();
    const data: Record<string, string | null> = { organization };

    if (this.emailChanged()) {
      data['email'] = email;
      data['code'] = code;
    }

    this.authStore.updateProfile(data, this.isEditing);
  }

  onDelete(): void {
    this.popupService.open({
      title: 'Delete account',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      type: 'warning',
      actions: [
        { label: 'Cancel', type: 'secondary' },
        {
          label: 'Delete account',
          type: 'primary',
          action: () => this.authStore.deleteProfile(),
        },
      ],
    });
  }
}