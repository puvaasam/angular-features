export interface User {
  userId?: number;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  password: string;
  addressId: number;
}

export type UserPayload = Omit<User, 'userId'>;
