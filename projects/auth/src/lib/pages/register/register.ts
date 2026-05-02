import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MhButton, MhInput, MhFormGroup } from 'ui';
import { AuthStore } from 'store';
import { CreateUser } from 'models';

@Component({
  selector: 'auth-register',
  imports: [ReactiveFormsModule, MhButton, MhInput, MhFormGroup],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private readonly authStore = inject(AuthStore);
  protected readonly signInRoute = signal('/signin');
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    organization: ['', [Validators.minLength(3)]],
  });

  // Expose store signals to template
  readonly isLoading = this.authStore.isLoading;
  readonly isLoadingGoogle = this.authStore.isLoadingGoogle

  ngOnInit(): void {
    this.authStore.fetchProfile('/');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue() as CreateUser;
    this.authStore.register(data);
  }

  continueWithGoogle(): void {
    this.authStore.googleLogin()
  }
}