import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { SignIn } from './signin';
import { AuthService } from 'api';
import { MhButton, MhInput, MhFormGroup } from 'ui';

describe('SignIn', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;
  let authServiceMock: { requestOtp: ReturnType<typeof vi.fn>; verifyOtp: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authServiceMock = {
      requestOtp: vi.fn(),
      verifyOtp: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MhButton, MhInput, MhFormGroup, SignIn],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
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

  it('should start with codeSent false', () => {
    expect(component.codeSent).toBe(false);
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
      expect(authServiceMock.requestOtp).not.toHaveBeenCalled();
    });

    it('should mark email as touched if invalid', () => {
      component.form.get('email')?.setValue('');
      component.onRequestCode();
      expect(component.form.get('email')?.touched).toBe(true);
    });

    it('should call requestOtp with email', () => {
      authServiceMock.requestOtp.mockReturnValue(of({ success: true, data: null, message: null }));
      component.form.get('email')?.setValue('test@example.com');
      component.onRequestCode();
      expect(authServiceMock.requestOtp).toHaveBeenCalledWith('test@example.com');
    });

    it('should set codeSent to true on success', () => {
      authServiceMock.requestOtp.mockReturnValue(of({ success: true, data: null, message: null }));
      component.form.get('email')?.setValue('test@example.com');
      component.onRequestCode();
      expect(component.codeSent).toBe(true);
    });

    it('should set error message on failure', () => {
      authServiceMock.requestOtp.mockReturnValue(of({ success: false, data: null, message: 'User not found' }));
      component.form.get('email')?.setValue('test@example.com');
      component.onRequestCode();
      expect(component.error).toBe('User not found');
    });

    it('should set error message on HTTP error', () => {
      authServiceMock.requestOtp.mockReturnValue(throwError(() => ({ error: { message: 'Server error' } })));
      component.form.get('email')?.setValue('test@example.com');
      component.onRequestCode();
      expect(component.error).toBe('Server error');
    });
  });

  describe('onVerifyCode', () => {
    beforeEach(() => {
      component.codeSent = true;
    });

    it('should not call verifyOtp if form is invalid', () => {
      component.onVerifyCode();
      expect(authServiceMock.verifyOtp).not.toHaveBeenCalled();
    });

    it('should call verifyOtp with email and code', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: true, data: { token: 'test-token', access: 'user' }, message: null }));
      component.form.get('email')?.setValue('test@example.com');
      component.form.get('code')?.setValue('123456');
      component.onVerifyCode();
      expect(authServiceMock.verifyOtp).toHaveBeenCalledWith({
        email: 'test@example.com',
        code: '123456',
      });
    });

    it('should store token on success', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: true, data: { token: 'test-token', access: 'user' }, message: null }));
      component.form.get('email')?.setValue('test@example.com');
      component.form.get('code')?.setValue('123456');
      component.onVerifyCode();
      expect(localStorage.getItem('token')).toBe('test-token');
    });

    it('should set error message on verification failure', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: false, data: null, message: 'Invalid code' }));
      component.form.get('email')?.setValue('test@example.com');
      component.form.get('code')?.setValue('123456');
      component.onVerifyCode();
      expect(component.error).toBe('Invalid code');
    });

    it('should set error message on HTTP error', () => {
      authServiceMock.verifyOtp.mockReturnValue(throwError(() => ({ error: { message: 'Expired code' } })));
      component.form.get('email')?.setValue('test@example.com');
      component.form.get('code')?.setValue('123456');
      component.onVerifyCode();
      expect(component.error).toBe('Expired code');
    });
  });
});