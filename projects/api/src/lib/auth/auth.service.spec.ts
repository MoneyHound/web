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
    it('should send POST request to /auth/register with credentials', () => {
      const mockResponse = {
        success: true,
        data: {
          _id: '123',
          email: 'test@example.com',
          username: 'testuser',
          organization: 'Test Org',
          status: UserStatus.Active,
          google_id: '',
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-01T00:00:00Z',
        } as User,
        message: null,
      };

      service.register({ email: 'test@example.com', organization: 'Test Org' }).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth');
      expect(req.request.method).toBe('POST');
      expect(req.request.withCredentials).toBe(true);
      expect(req.request.body).toEqual({ email: 'test@example.com', organization: 'Test Org' });
      req.flush(mockResponse);
    });
  });

  describe('requestOtp', () => {
    it('should send GET request to /auth/request with credentials', () => {
      const mockResponse = { success: true, data: null, message: null };

      service.requestOtp('test@example.com').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne((r) => r.url === 'http://localhost:8080/auth/request' && r.params.get('email') === 'test@example.com');
      expect(req.request.method).toBe('GET');
      expect(req.request.withCredentials).toBe(true);
      req.flush(mockResponse);
    });
  });

  describe('verifyOtp', () => {
    it('should send POST request to /auth/verify with credentials', () => {
      const mockResponse = {
        success: true,
        data: null,
        message: null,
      };

      service.verifyOtp({ email: 'test@example.com', code: '123456' }).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth/verify');
      expect(req.request.method).toBe('POST');
      expect(req.request.withCredentials).toBe(true);
      expect(req.request.body).toEqual({ email: 'test@example.com', code: '123456' });
      req.flush(mockResponse);
    });
  });

  describe('getProfile', () => {
    it('should send GET request to /auth/profile with credentials', () => {
      const mockResponse = {
        success: true,
        data: {
          _id: '123',
          email: 'test@example.com',
          username: 'testuser',
          organization: 'Test Org',
          status: UserStatus.Active,
          google_id: '',
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-01T00:00:00Z',
        } as User,
        message: null,
      };

      service.getProfile().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth/profile');
      expect(req.request.method).toBe('GET');
      expect(req.request.withCredentials).toBe(true);
      req.flush(mockResponse);
    });
  });

  describe('updateProfile', () => {
    it('should send PATCH request to /auth/profile with credentials', () => {
      const mockResponse = {
        success: true,
        data: {
          _id: '123',
          email: 'new@example.com',
          username: 'testuser',
          organization: 'New Org',
          status: UserStatus.Active,
          google_id: '',
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-02T00:00:00Z',
        } as User,
        message: null,
      };

      service.updateProfile({ email: 'new@example.com', organization: 'New Org' }).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth/profile');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.withCredentials).toBe(true);
      req.flush(mockResponse);
    });
  });

  describe('deleteProfile', () => {
    it('should send DELETE request to /auth/profile with credentials', () => {
      const mockResponse = { success: true, data: null, message: null };

      service.deleteProfile().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth/profile');
      expect(req.request.method).toBe('DELETE');
      expect(req.request.withCredentials).toBe(true);
      req.flush(mockResponse);
    });
  });
});