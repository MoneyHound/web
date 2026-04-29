import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Register } from './register';
import { AuthStore } from 'store';
import { MhButton, MhInput, MhFormGroup } from 'ui';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let authStoreMock: {
    register: ReturnType<typeof vi.fn>;
    isLoading: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    authStoreMock = {
      register: vi.fn(),
      isLoading: vi.fn(() => false),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MhButton, MhInput, MhFormGroup, Register],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthStore, useValue: authStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('organization')?.value).toBe('');
  });

  describe('form validation', () => {
    it('should be invalid when empty', () => {
      expect(component.form.invalid).toBe(true);
    });

    it('should require email', () => {
      component.form.get('email')?.setValue('');
      component.form.get('organization')?.setValue('Test Org');
      expect(component.form.get('email')?.errors?.['required']).toBeTruthy();
    });

    it('should validate email format', () => {
      component.form.get('email')?.setValue('invalid-email');
      expect(component.form.get('email')?.errors?.['email']).toBeTruthy();
    });

    it('should accept valid email', () => {
      component.form.get('email')?.setValue('test@example.com');
      expect(component.form.get('email')?.errors).toBeNull();
    });

    it('should require organization', () => {
      component.form.get('organization')?.setValue('');
      component.form.get('email')?.setValue('test@example.com');
      expect(component.form.get('organization')?.errors?.['required']).toBeTruthy();
    });

    it('should require organization to be at least 3 characters', () => {
      component.form.get('organization')?.setValue('ab');
      expect(component.form.get('organization')?.errors?.['minlength']).toBeTruthy();
    });

    it('should accept valid organization', () => {
      component.form.get('organization')?.setValue('Test Org');
      expect(component.form.get('organization')?.errors).toBeNull();
    });

    it('should be valid with all fields correct', () => {
      component.form.get('email')?.setValue('test@example.com');
      component.form.get('organization')?.setValue('Test Org');
      expect(component.form.valid).toBe(true);
    });
  });

  describe('onSubmit', () => {
    it('should not call register if form is invalid', () => {
      component.onSubmit();
      expect(authStoreMock.register).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched if form is invalid', () => {
      component.onSubmit();
      expect(component.form.get('email')?.touched).toBe(true);
      expect(component.form.get('organization')?.touched).toBe(true);
    });

    it('should call authStore.register with form data when valid', () => {
      component.form.get('email')?.setValue('test@example.com');
      component.form.get('organization')?.setValue('Test Org');
      component.onSubmit();

      expect(authStoreMock.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        organization: 'Test Org',
      });
    });
  });
});