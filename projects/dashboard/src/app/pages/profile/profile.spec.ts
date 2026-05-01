import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Profile } from './profile';
import { AuthStore } from 'store';
import { PopupService, MhButton, MhFormGroup, MhInput } from 'ui';
import { provideRouter } from '@angular/router';

const defaultUser = {
  _id: '1',
  email: 'test@example.com',
  username: 'testuser',
  organization: 'Test Org',
  status: 0,
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  google_id: '',
};

function createMock(user: typeof defaultUser | null = defaultUser) {
  return {
    user: vi.fn(() => user),
    isAuthenticated: vi.fn(() => true),
    isLoading: vi.fn(() => false),
    updateProfile: vi.fn(),
    deleteProfile: vi.fn(),
    requestOtp: vi.fn(),
    resetCodeSent: vi.fn(),
    codeSent: vi.fn(() => false),
    resendWait: vi.fn(() => 0),
  };
}

function createPopupMock() {
  return {
    open: vi.fn(),
    close: vi.fn(),
    popup: vi.fn(() => null),
  };
}

function setupProfile(mock: ReturnType<typeof createMock>, popupMock: ReturnType<typeof createPopupMock>) {
  TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, MhButton, MhFormGroup, MhInput, Profile],
    providers: [
      provideRouter([]),
      { provide: AuthStore, useValue: mock },
      { provide: PopupService, useValue: popupMock },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(Profile);
  fixture.detectChanges();
  return fixture;
}

describe('Profile', () => {
  let mock: ReturnType<typeof createMock>;
  let popupMock: ReturnType<typeof createPopupMock>;
  let fixture: ComponentFixture<Profile>;

  beforeEach(() => {
    mock = createMock();
    popupMock = createPopupMock();
    fixture = setupProfile(mock, popupMock);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display username in welcome message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile__title')?.textContent).toContain('testuser');
  });

  it('should display user email', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('test@example.com');
  });

  it('should display user organization', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Org');
  });

  it('should display active status', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Active');
  });

  it('should not show the edit form by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeNull();
  });

  it('should show edit form when toggleEdit is called', () => {
    fixture.componentInstance.toggleEdit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).not.toBeNull();
    expect(compiled.querySelector('.profile__cards')).toBeNull();
  });

  it('should pre-populate form with current user data when editing', () => {
    fixture.componentInstance.toggleEdit();
    fixture.detectChanges();

    const form = fixture.componentInstance.form;
    expect(form.get('email')?.value).toBe('test@example.com');
    expect(form.get('organization')?.value).toBe('Test Org');
  });

  it('should hide edit form on cancel', () => {
    fixture.componentInstance.toggleEdit();
    fixture.detectChanges();

    fixture.componentInstance.toggleEdit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeNull();
    expect(compiled.querySelector('.profile__cards')).not.toBeNull();
  });

  it('should reset codeSent when toggling edit off', () => {
    fixture.componentInstance.toggleEdit();
    fixture.detectChanges();

    fixture.componentInstance.toggleEdit();

    expect(mock.resetCodeSent).toHaveBeenCalled();
  });
});

describe('Profile OTP flow', () => {
  let mock: ReturnType<typeof createMock>;
  let popupMock: ReturnType<typeof createPopupMock>;
  let fixture: ComponentFixture<Profile>;

  beforeEach(() => {
    mock = createMock();
    popupMock = createPopupMock();
    fixture = setupProfile(mock, popupMock);
    fixture.componentInstance.toggleEdit();
    fixture.detectChanges();
  });

  it('should not show otp input when email has not changed', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-otp-input')).toBeNull();
  });

  it('should show otp input when email changes', () => {
    fixture.componentInstance.form.get('email')?.setValue('new@example.com');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-otp-input')).not.toBeNull();
  });

  it('should call requestOtp when send code is clicked', () => {
    fixture.componentInstance.onRequestCode();
    expect(mock.requestOtp).toHaveBeenCalledWith('test@example.com');
  });

  it('should show code input when codeSent is true and email changed', () => {
    mock.codeSent.mockReturnValue(true);
    fixture.componentInstance.form.get('email')?.setValue('new@example.com');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const codeInput = compiled.querySelector('#code');
    expect(codeInput).not.toBeNull();
  });

  it('should not show code input when email has not changed even if codeSent is true', () => {
    mock.codeSent.mockReturnValue(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#code')).toBeNull();
  });

  it('should not call updateProfile when email changed but no code sent', () => {
    fixture.componentInstance.form.get('email')?.setValue('new@example.com');
    fixture.componentInstance.form.get('organization')?.setValue('Test Org');
    fixture.componentInstance.onSubmit();

    expect(mock.updateProfile).not.toHaveBeenCalled();
  });

  it('should include email and code in updateProfile when email changed and code sent', () => {
    mock.codeSent.mockReturnValue(true);
    fixture.componentInstance.form.get('email')?.setValue('new@example.com');
    fixture.componentInstance.form.get('organization')?.setValue('Test Org');
    fixture.componentInstance.form.get('code')?.setValue('123456');
    fixture.componentInstance.onSubmit();

    expect(mock.updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'new@example.com',
        code: '123456',
        organization: 'Test Org',
      }),
      expect.anything(),
    );
  });

  it('should not include email or code in updateProfile when email unchanged', () => {
    fixture.componentInstance.form.get('organization')?.setValue('New Org');
    fixture.componentInstance.onSubmit();

    expect(mock.updateProfile).toHaveBeenCalledWith(
      { organization: 'New Org' },
      expect.anything(),
    );
  });
});

describe('Profile form validation', () => {
  let mock: ReturnType<typeof createMock>;
  let popupMock: ReturnType<typeof createPopupMock>;
  let fixture: ComponentFixture<Profile>;

  beforeEach(() => {
    mock = createMock();
    popupMock = createPopupMock();
    fixture = setupProfile(mock, popupMock);
    fixture.componentInstance.toggleEdit();
    fixture.detectChanges();
  });

  it('should be invalid with empty email', () => {
    const form = fixture.componentInstance.form;
    form.get('email')?.setValue('');
    form.get('organization')?.setValue('Test Org');
    expect(form.get('email')?.errors?.['required']).toBeTruthy();
  });

  it('should be invalid with bad email format', () => {
    const form = fixture.componentInstance.form;
    form.get('email')?.setValue('invalid-email');
    expect(form.get('email')?.errors?.['email']).toBeTruthy();
  });

  it('should accept valid email', () => {
    const form = fixture.componentInstance.form;
    form.get('email')?.setValue('valid@example.com');
    expect(form.get('email')?.errors).toBeNull();
  });

  it('should be invalid with organization shorter than 3 characters', () => {
    const form = fixture.componentInstance.form;
    form.get('email')?.setValue('test@example.com');
    form.get('organization')?.setValue('ab');
    expect(form.get('organization')?.errors?.['minlength']).toBeTruthy();
  });

  it('should not call updateProfile when form is invalid', () => {
    const form = fixture.componentInstance.form;
    form.get('email')?.setValue('');
    fixture.componentInstance.onSubmit();
    expect(mock.updateProfile).not.toHaveBeenCalled();
  });
});

describe('Profile delete', () => {
  let mock: ReturnType<typeof createMock>;
  let popupMock: ReturnType<typeof createPopupMock>;
  let fixture: ComponentFixture<Profile>;

  beforeEach(() => {
    mock = createMock();
    popupMock = createPopupMock();
    fixture = setupProfile(mock, popupMock);
  });

  it('should open popup confirmation on delete click', () => {
    fixture.componentInstance.onDelete();

    expect(popupMock.open).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Delete account',
        type: 'warning',
      }),
    );
  });

  it('should call deleteProfile when popup action is confirmed', () => {
    fixture.componentInstance.onDelete();

    const popupConfig = popupMock.open.mock.calls[0][0];
    const deleteAction = popupConfig.actions.find((a: { label: string }) => a.label === 'Delete account');
    deleteAction.action();

    expect(mock.deleteProfile).toHaveBeenCalled();
  });
});

describe('Profile edge cases', () => {
  it('should show fallback when username is missing', () => {
    const user = { ...defaultUser, username: undefined as unknown as string };
    const mock = createMock(user);
    const popupMock = createPopupMock();
    const fixture = setupProfile(mock, popupMock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile__title')?.textContent).toContain('Welcome back');
  });

  it('should show dash for missing organization', () => {
    const user = { ...defaultUser, organization: '' };
    const mock = createMock(user);
    const popupMock = createPopupMock();
    const fixture = setupProfile(mock, popupMock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('—');
  });

  it('should show Inactive status when status is not 0', () => {
    const user = { ...defaultUser, status: 1 };
    const mock = createMock(user);
    const popupMock = createPopupMock();
    const fixture = setupProfile(mock, popupMock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Inactive');
  });
});