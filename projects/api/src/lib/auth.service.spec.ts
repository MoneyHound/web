import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User, UserStatus } from 'models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should send POST request to /auth/register', () => {
      const mockResponse = {
        success: true,
        data: {
          _id: '123',
          email: 'test@example.com',
          organization: 'Test Org',
          status: UserStatus.Active,
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-01T00:00:00Z',
        } as User,
        message: null,
      };

      service.register({ email: 'test@example.com', organization: 'Test Org' }).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8000/auth/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'test@example.com', organization: 'Test Org' });
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const errorResponse = { success: false, data: null, message: 'User already exists' };

      service.register({ email: 'test@example.com', organization: 'Test Org' }).subscribe({
        error: (error) => {
          expect(error.error.message).toBe('User already exists');
        },
      });

      const req = httpMock.expectOne('http://localhost:8000/auth/register');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('requestOtp', () => {
    it('should send GET request to /auth/request', () => {
      const mockResponse = { success: true, data: null, message: null };

      service.requestOtp('test@example.com').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne((r) => r.url === 'http://localhost:8000/auth/request' && r.params.get('email') === 'test@example.com');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const errorResponse = { success: false, data: null, message: 'User not found' };

      service.requestOtp('test@example.com').subscribe({
        error: (error) => {
          expect(error.error.message).toBe('User not found');
        },
      });

      const req = httpMock.expectOne((r) => r.url === 'http://localhost:8000/auth/request');
      req.flush(errorResponse, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('verifyOtp', () => {
    it('should send POST request to /auth/verify', () => {
      const mockResponse = {
        success: true,
        data: { token: 'jwt-token', access: 'user' },
        message: null,
      };

      service.verifyOtp({ email: 'test@example.com', code: '123456' }).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8000/auth/verify');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'test@example.com', code: '123456' });
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const errorResponse = { success: false, data: null, message: 'Invalid code' };

      service.verifyOtp({ email: 'test@example.com', code: '123456' }).subscribe({
        error: (error) => {
          expect(error.error.message).toBe('Invalid code');
        },
      });

      const req = httpMock.expectOne('http://localhost:8000/auth/verify');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });
});