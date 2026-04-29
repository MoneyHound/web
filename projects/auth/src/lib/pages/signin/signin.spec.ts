import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { SignIn } from './signin';
import { AuthStore } from 'store';
import { MhButton, MhInput, MhFormGroup } from 'ui';

describe('SignIn', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;
  let authStoreMock: {
    requestOtp: ReturnType<typeof vi.fn>;
    verifyOtp: ReturnType<typeof vi.fn>;
    isLoading: ReturnType<typeof vi.fn>;
    codeSent: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    authStoreMock = {
      requestOtp: vi.fn(),
      verifyOtp: vi.fn(),
      isLoading: vi.fn(() => false),
      codeSent: vi.fn(() => false),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MhButton, MhInput, MhFormGroup, SignIn],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthStore, useValue: authStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('code')?.value).toBe('');
  });

  describe('form validation', () => {
    it('should be invalid when empty', () => {
      expect(component.form.invalid).toBe(true);
    });

    it('should require email', () => {
      component.form.get('email')?.setValue('');
      expect(component.form.get('email')?.errors?.['required']).toBeTruthy();
    });

    it('should validate email format', () => {
      component.form.get('email')?.setValue('invalid-email');
      expect(component.form.get('email')?.errors?.['email']).toBeTruthy();
    });

    it('should require code', () => {
      component.form.get('code')?.setValue('');
      expect(component.form.get('code')?.errors?.['required']).toBeTruthy();
    });

    it('should require code to be at least 6 characters', () => {
      component.form.get('code')?.setValue('12345');
      expect(component.form.get('code')?.errors?.['minlength']).toBeTruthy();
    });
  });

  describe('onRequestCode', () => {
    it('should not call requestOtp if email is invalid', () => {
      component.form.get('email')?.setValue('invalid');
      component.onRequestCode();
      expect(authStoreMock.requestOtp).not.toHaveBeenCalled();
    });

    it('should mark email as touched if invalid', () => {
      component.form.get('email')?.setValue('');
      component.onRequestCode();
      expect(component.form.get('email')?.touched).toBe(true);
    });

    it('should call authStore.requestOtp with email', () => {
      component.form.get('email')?.setValue('test@example.com');
      component.onRequestCode();
      expect(authStoreMock.requestOtp).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('onVerifyCode', () => {
    it('should not call verifyOtp if form is invalid', () => {
      component.onVerifyCode();
      expect(authStoreMock.verifyOtp).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched if form is invalid', () => {
      component.onVerifyCode();
      expect(component.form.get('email')?.touched).toBe(true);
      expect(component.form.get('code')?.touched).toBe(true);
    });

    it('should call authStore.verifyOtp with email and code', () => {
      component.form.get('email')?.setValue('test@example.com');
      component.form.get('code')?.setValue('123456');
      component.onVerifyCode();
      expect(authStoreMock.verifyOtp).toHaveBeenCalledWith({
        email: 'test@example.com',
        code: '123456',
      });
    });
  });
});