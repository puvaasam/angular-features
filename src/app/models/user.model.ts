export type UserRole = 'Admin' | 'Standard';

export interface User {
  userId?: number;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  password: string;
  addressId: number;
  role: UserRole;
}

export type UserPayload = Omit<User, 'userId'>;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
}
