import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthStore } from './auth.store';
import { AuthService } from 'api';
import { ToastService } from 'ui';
import { User, UserStatus } from 'models';

describe('AuthStore', () => {
  let store: AuthStore;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let toastServiceMock: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
    info: ReturnType<typeof vi.fn>;
  };
  let authServiceMock: {
    register: ReturnType<typeof vi.fn>;
    requestOtp: ReturnType<typeof vi.fn>;
    verifyOtp: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    routerMock = {
      navigate: vi.fn(),
    };

    toastServiceMock = {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
    };

    authServiceMock = {
      register: vi.fn(),
      requestOtp: vi.fn(),
      verifyOtp: vi.fn(),
    };

    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    });

    store = TestBed.inject(AuthStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have null user initially', () => {
      expect(store.user()).toBeNull();
    });

    it('should have null token initially', () => {
      expect(store.token()).toBeNull();
    });

    it('should not be authenticated initially', () => {
      expect(store.isAuthenticated()).toBe(false);
    });

    it('should not be loading initially', () => {
      expect(store.isLoading()).toBe(false);
    });

    it('should not have codeSent initially', () => {
      expect(store.codeSent()).toBe(false);
    });
  });

  describe('register', () => {
    const mockUser: User = {
      _id: '123',
      email: 'test@example.com',
      organization: 'Test Org',
      status: UserStatus.Active,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    };

    it('should set loading and then complete', () => {
      authServiceMock.register.mockReturnValue(of({ success: true, data: mockUser, message: null }));

      store.register({ email: 'test@example.com', organization: 'Test Org' });
      expect(store.isLoading()).toBe(false);
    });

    it('should call authService.register with data', () => {
      authServiceMock.register.mockReturnValue(of({ success: true, data: mockUser, message: null }));

      store.register({ email: 'test@example.com', organization: 'Test Org' });
      expect(authServiceMock.register).toHaveBeenCalledWith({ email: 'test@example.com', organization: 'Test Org' });
    });

    it('should set user on successful registration', () => {
      authServiceMock.register.mockReturnValue(of({ success: true, data: mockUser, message: null }));

      store.register({ email: 'test@example.com', organization: 'Test Org' });

      expect(store.user()).toEqual(mockUser);
    });

    it('should show success toast on successful registration', () => {
      authServiceMock.register.mockReturnValue(of({ success: true, data: mockUser, message: null }));

      store.register({ email: 'test@example.com', organization: 'Test Org' });

      expect(toastServiceMock.success).toHaveBeenCalledWith('Registration successful! Please sign in.');
    });

    it('should show error toast on failed registration', () => {
      authServiceMock.register.mockReturnValue(of({ success: false, data: null, message: 'User already exists' }));

      store.register({ email: 'test@example.com', organization: 'Test Org' });

      expect(toastServiceMock.error).toHaveBeenCalledWith('User already exists');
    });

    it('should show error toast on HTTP error', () => {
      authServiceMock.register.mockReturnValue(throwError(() => ({ error: { message: 'Server error' } })));

      store.register({ email: 'test@example.com', organization: 'Test Org' });

      expect(toastServiceMock.error).toHaveBeenCalledWith('Server error');
    });
  });

  describe('requestOtp', () => {
    it('should complete loading after request', () => {
      authServiceMock.requestOtp.mockReturnValue(of({ success: true, data: null, message: null }));

      store.requestOtp('test@example.com');
      expect(store.isLoading()).toBe(false);
    });

    it('should set codeSent to true on success', () => {
      authServiceMock.requestOtp.mockReturnValue(of({ success: true, data: null, message: null }));

      store.requestOtp('test@example.com');

      expect(store.codeSent()).toBe(true);
    });

    it('should show success toast on code sent', () => {
      authServiceMock.requestOtp.mockReturnValue(of({ success: true, data: null, message: null }));

      store.requestOtp('test@example.com');

      expect(toastServiceMock.success).toHaveBeenCalledWith('Verification code sent to your email');
    });

    it('should show error toast on failed request', () => {
      authServiceMock.requestOtp.mockReturnValue(of({ success: false, data: null, message: 'User not found' }));

      store.requestOtp('test@example.com');

      expect(toastServiceMock.error).toHaveBeenCalledWith('User not found');
    });
  });

  describe('verifyOtp', () => {
    it('should complete loading after verification', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: true, data: { token: 'jwt-token', access: 'user' }, message: null }));

      store.verifyOtp({ email: 'test@example.com', code: '123456' });
      expect(store.isLoading()).toBe(false);
    });

    it('should set token on successful verification', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: true, data: { token: 'jwt-token', access: 'user' }, message: null }));

      store.verifyOtp({ email: 'test@example.com', code: '123456' });

      expect(store.token()).toBe('jwt-token');
    });

    it('should store token in localStorage on success', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: true, data: { token: 'jwt-token', access: 'user' }, message: null }));

      store.verifyOtp({ email: 'test@example.com', code: '123456' });

      expect(localStorage.getItem('token')).toBe('jwt-token');
    });

    it('should set isAuthenticated to true after verification', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: true, data: { token: 'jwt-token', access: 'user' }, message: null }));

      store.verifyOtp({ email: 'test@example.com', code: '123456' });

      expect(store.isAuthenticated()).toBe(true);
    });

    it('should show success toast on successful verification', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: true, data: { token: 'jwt-token', access: 'user' }, message: null }));

      store.verifyOtp({ email: 'test@example.com', code: '123456' });

      expect(toastServiceMock.success).toHaveBeenCalledWith('Signed in successfully!');
    });

    it('should show error toast on failed verification', () => {
      authServiceMock.verifyOtp.mockReturnValue(of({ success: false, data: null, message: 'Invalid code' }));

      store.verifyOtp({ email: 'test@example.com', code: '123456' });

      expect(toastServiceMock.error).toHaveBeenCalledWith('Invalid code');
    });
  });

  describe('logout', () => {
    it('should clear user', () => {
      store.logout();
      expect(store.user()).toBeNull();
    });

    it('should clear token', () => {
      store.logout();
      expect(store.token()).toBeNull();
    });

    it('should clear localStorage token', () => {
      localStorage.setItem('token', 'test-token');
      store.logout();
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should set isAuthenticated to false', () => {
      store.logout();
      expect(store.isAuthenticated()).toBe(false);
    });

    it('should reset codeSent', () => {
      store.logout();
      expect(store.codeSent()).toBe(false);
    });

    it('should show info toast', () => {
      store.logout();
      expect(toastServiceMock.info).toHaveBeenCalledWith('You have been signed out');
    });
  });

  describe('resetCodeSent', () => {
    it('should reset codeSent to false', () => {
      authServiceMock.requestOtp.mockReturnValue(of({ success: true, data: null, message: null }));
      store.requestOtp('test@example.com');
      store.resetCodeSent();
      expect(store.codeSent()).toBe(false);
    });
  });
});