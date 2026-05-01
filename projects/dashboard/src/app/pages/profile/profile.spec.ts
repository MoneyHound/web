import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Profile } from './profile';
import { AuthStore } from 'store';
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
  };
}

function setupProfile(mock: ReturnType<typeof createMock>) {
  TestBed.configureTestingModule({
    imports: [Profile],
    providers: [
      provideRouter([]),
      { provide: AuthStore, useValue: mock },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(Profile);
  fixture.detectChanges();
  return fixture;
}

describe('Profile', () => {
  let mock: ReturnType<typeof createMock>;
  let fixture: ComponentFixture<Profile>;

  beforeEach(() => {
    mock = createMock();
    fixture = setupProfile(mock);
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
});

describe('Profile (edge cases)', () => {
  it('should show fallback when username is missing', () => {
    const user = { ...defaultUser, username: undefined as unknown as string };
    const mock = createMock(user);
    const fixture = setupProfile(mock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile__title')?.textContent).toContain('Welcome back');
  });

  it('should show dash for missing organization', () => {
    const user = { ...defaultUser, organization: '' };
    const mock = createMock(user);
    const fixture = setupProfile(mock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('—');
  });

  it('should show Inactive status when status is not 0', () => {
    const user = { ...defaultUser, status: 1 };
    const mock = createMock(user);
    const fixture = setupProfile(mock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Inactive');
  });
});