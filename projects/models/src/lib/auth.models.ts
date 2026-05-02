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
  code?: string | null;
}
