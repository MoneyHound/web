import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUser, VerifyOTP, DataResponse, UpdateProfile, OTP } from 'models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080';

  register(data: CreateUser): Observable<DataResponse<User>> {
    return this.http.post<DataResponse<User>>(`${this.baseUrl}/auth/register`, data, {
      withCredentials: true,
    });
  }

  requestOtp(email: string): Observable<DataResponse<OTP>> {
    return this.http.get<DataResponse<OTP>>(`${this.baseUrl}/auth/request`, {
      params: { email },
      withCredentials: true,
    });
  }

  verifyOtp(data: VerifyOTP): Observable<DataResponse<null>> {
    return this.http.post<DataResponse<null>>(`${this.baseUrl}/auth/verify`, data, {
      withCredentials: true,
    });
  }

  getProfile(): Observable<DataResponse<User>> {
    return this.http.get<DataResponse<User>>(`${this.baseUrl}/auth/profile`, {
      withCredentials: true,
    });
  }

  updateProfile(data: UpdateProfile): Observable<DataResponse<User>> {
    return this.http.patch<DataResponse<User>>(`${this.baseUrl}/auth/profile`, data, {
      withCredentials: true,
    });
  }

  deleteProfile(): Observable<DataResponse<null>> {
    return this.http.delete<DataResponse<null>>(`${this.baseUrl}/auth/profile`, {
      withCredentials: true,
    });
  }
}
