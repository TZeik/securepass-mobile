// Define los tipos para tus rutas

export type RootStackParamList = {
  Login: undefined;
  Main: {
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
  };
  Scanner: {
    onScanned?: (value: string) => void;
    token: string;
  };
  AccessDetails: {
    token: string;
  };
  PersonDetail: {
    token: string;
  };
  ExitRegistration: {
    token: string;
  };
};