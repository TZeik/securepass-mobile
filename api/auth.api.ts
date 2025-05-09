import axios from "axios";

const API_URL = "http://localhost:8000/api";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse{
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        apartment?: string;
        tel?: string;
        shift?: string;
        registerDate: string;
    };
    expiresIn: number;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse | void> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error al iniciar sesion", error);
  }
};