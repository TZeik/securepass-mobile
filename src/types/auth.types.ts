// Interface con tipo de request para /api/auth/login
export interface LoginData {
  email: string;
  password: string;
}

// Interface con tipo responde de /api/auth/login
export interface LoginResponse {
  token: string;
  user: User
  expiresIn: number;
}

// Interface con tipo de response de usuario /api
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
