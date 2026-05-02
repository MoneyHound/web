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

