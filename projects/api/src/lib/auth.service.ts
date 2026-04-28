import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUser, VerifyOTP, Token, DataResponse } from 'models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080';

  register(data: CreateUser): Observable<DataResponse<User>> {
    return this.http.post<DataResponse<User>>(`${this.baseUrl}/auth/register`, data);
  }

  requestOtp(email: string): Observable<DataResponse<null>> {
    return this.http.get<DataResponse<null>>(`${this.baseUrl}/auth/request`, {
      params: { email },
    });
  }

  verifyOtp(data: VerifyOTP): Observable<DataResponse<Token>> {
    return this.http.post<DataResponse<Token>>(`${this.baseUrl}/auth/verify`, data);
  }
}