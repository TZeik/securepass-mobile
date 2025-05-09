export interface LoginData {
  email: string;
  password: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    apartment?: string;
    tel?: string;
    shift?: string;
    registerDate: string;
}

export interface LoginResponse {
  token: string;
  user: User
  expiresIn: number;
}