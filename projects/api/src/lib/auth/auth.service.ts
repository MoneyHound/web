import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUser, VerifyOTP, DataResponse, UpdateProfile, OTP, APP_CONFIG } from 'models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG)

  register(data: CreateUser): Observable<DataResponse<User>> {
    return this.http.post<DataResponse<User>>(`${this.config.apiUrl}/auth/register`, data, {
      withCredentials: true,
    });
  }

  requestOtp(email: string): Observable<DataResponse<OTP>> {
    return this.http.get<DataResponse<OTP>>(`${this.config.apiUrl}/auth/request`, {
      params: { email },
      withCredentials: true,
    });
  }

  verifyOtp(data: VerifyOTP): Observable<DataResponse<null>> {
    return this.http.post<DataResponse<null>>(`${this.config.apiUrl}/auth/verify`, data, {
      withCredentials: true,
    });
  }

  getProfile(): Observable<DataResponse<User>> {
    return this.http.get<DataResponse<User>>(`${this.config.apiUrl}/auth/profile`, {
      withCredentials: true,
    });
  }

  updateProfile(data: UpdateProfile): Observable<DataResponse<User>> {
    return this.http.patch<DataResponse<User>>(`${this.config.apiUrl}/auth/profile`, data, {
      withCredentials: true,
    });
  }

  deleteProfile(): Observable<DataResponse<null>> {
    return this.http.delete<DataResponse<null>>(`${this.config.apiUrl}/auth/profile`, {
      withCredentials: true,
    });
  }

  logout(): Observable<DataResponse<null>> {
    return this.http.post<DataResponse<null>>(`${this.config.apiUrl}/auth/logout`, {
      withCredentials: true,
    });
  }
}
