import axios from "axios";
import { LoginData, LoginResponse } from "../types/auth.types";
import { User } from "../types/user.types";

const API_URL = "http://api.asolutions.digital/api";

export const getResidents = async () : Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_URL}/residents`);
        const residents = response.data.map((resident: any) => ({
      ...resident,
      registerDate: new Date(resident.registerDate),
    }))
        return residents;
    }catch(error){
        console.error('Error al obtener los residentes');
        throw error;
    }
}