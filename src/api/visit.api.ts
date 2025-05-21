import axios from "axios";
import { RegistryData, VisitResponse } from "../types/visit.types";
import Constants from "expo-constants"
import { loadToken } from "@/services/auth.service";

const { apiUrl } = Constants.expoConfig?.extra as {apiUrl: string};
const API_URL = apiUrl;

export const getVisitsByResidentId = async (
  id: string
): Promise<VisitResponse[]> => {
  try {
    const response = await axios.get<VisitResponse[]>(
      `${API_URL}/visits/resident/${id}`
    );
    const visits = response.data.map((visit: any) => ({
      ...visit,
      createdAt: new Date(visit.createdAt),
      updatedAt: new Date(visit.updatedAt),
      authorization: {
        ...visit.authorization,
        date: new Date(visit.authorization.date),
        exp: visit.authorization.exp
          ? new Date(visit.authorization.exp)
          : undefined,
      },
      registry: visit.registry
        ? {
            ...visit.registry,
            entry: visit.registry.entry
              ? {
                  ...visit.registry.entry,
                  date: visit.registry.entry.date
                    ? new Date(visit.registry.entry.date)
                    : undefined,
                }
              : undefined,
            exit: visit.registry.exit
              ? {
                  ...visit.registry.exit,
                  date: visit.registry.entry.date
                    ? new Date(visit.registry.exit.date)
                    : undefined,
                }
              : undefined,
          }
        : undefined,
    }));
    return visits;
  } catch (error: any) {
    console.error(`Error al obtener los datos de la visita`, error);
    throw error;
  }
};

export const getVisitsByQRId = async (id: string): Promise<VisitResponse> => {
  try {
    const response = await axios.get<VisitResponse>(
      `${API_URL}/visits/qr/${id}`
    );
    const visit = response.data;

    return {
      ...visit,
      createdAt: new Date(visit.createdAt),
      updatedAt: new Date(visit.updatedAt),
      authorization: {
        ...visit.authorization,
        date: new Date(visit.authorization.date),
        exp: visit.authorization.exp
          ? new Date(visit.authorization.exp)
          : new Date(0),
      },
      registry: visit.registry
        ? {
            ...visit.registry,
            entry: visit.registry.entry
              ? {
                  ...visit.registry.entry,
                  date: visit.registry.entry.date
                    ? new Date(visit.registry.entry.date)
                    : undefined,
                }
              : undefined,
            exit: visit.registry.exit
              ? {
                  ...visit.registry.exit,
                  date: visit.registry.exit.date
                    ? new Date(visit.registry.exit.date)
                    : undefined,
                }
              : undefined,
          }
        : undefined,
    };
  } catch (error: any) {
    console.error(`Error al obtener los datos de la visita`, error);
    throw error;
  }
};

export const RegisterEntry = async (
  data: RegistryData,
  status: 'aprobada' | 'rechazada'
) => {
  try {
    const response = await axios.put(`${API_URL}/visits/entry/?status=${status}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar estado de visita:', error);
    throw error;
  }
};

export const RegisterExit = async (
  data: RegistryData,
) => {
  try {
    const response = await axios.put(`${API_URL}/visits/exit`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar estado de visita:', error);
    throw error;
  }
};

export const uploadImage = async (
  uri: string,
  endpoint: 'upload-visit' | 'upload-vehicle',
  document?: string
): Promise<string> => {
  try {
    
    const formData = new FormData();
    const fileType = uri.split('.').pop() || 'jpg';
    formData.append('file', {
      uri,
      name: `image_${Date.now()}.${fileType}`,
      type: `image/${fileType}`,
    } as any);

    
    const response = await axios.post(
      `${API_URL}/visits/${endpoint}/${document}`,
      formData
    );

   
    if (response.status !== 200 || !response.data?.data) {
      throw new Error(response.data?.message || 'Respuesta inválida del servidor');
    }

    return response.data.message || 'Imagen subida con éxito';

  } catch (error) {
    console.error('Error en uploadImage:', error);
    throw new Error(
     
      'Error al subir la imagen'
    );
  }
};