export enum UserStatus {
  Active,
  Inactive,
}

export interface User {
  _id: string;
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
  organization: string;
  status: UserStatus;
  google_id: string;
}

export interface CreateUser {
  email: string;
  organization?: string | null;
}

export interface VerifyOTP {
  email: string;
  code: string;
}

export interface Token {
  token: string;
  access: string;
}

export interface OTP {
  resend_wait: number;
}

export interface UpdateProfile {
  email?: string | null;
  organization?: string | null;
}

export interface DataResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
}