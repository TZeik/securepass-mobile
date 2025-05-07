// Define los tipos para tus rutas

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Scanner: { onScanned: (value: string) => void };
  AccessDetails: undefined;
  PersonDetail: {
    person: any
  };
  ExitRegistration: undefined;
};