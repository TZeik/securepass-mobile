// Define los tipos para tus rutas

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Scanner: { onScanned: (value: string) => void };
  AccessDetails: undefined;
  PersonDetail: {
    person: {
      id: number;
      name: string;
      entryTime: string;
      entryDate: string;
      fullName: string;
      idNumber: string;
      vehicle: string;
    };
  };
};