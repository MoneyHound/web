export enum UserStatus {
  Active,
  Inactive
}

export interface User {
  _id: string;
  created_at: string;
  updated_at: string;
  email: string;
  organization: string;
  status: UserStatus;
}

export interface CreateUser {
  email: string;
  organization: string;
}

export interface VerifyOTP {
  email: string;
  code: string;
}

export interface Token {
  token: string;
  access: string;
}

export interface DataResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
}