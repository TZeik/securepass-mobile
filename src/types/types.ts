import { User } from "./user.types";

export type RootStackParamList = {
  Login: undefined;

  Main: {
    token: string;
    user: User;
  };

  Scanner: {
    onScanned?: (value: string) => void;
    token: string;
  };

  ResidentDetail: {
    resident: User;
  };

  EntryForm: { qrData: string};


  ResidentList: {
    token: string;
    user: User;
  };

  ExitRegistration: {
    onScanned?: (value: string) => void;
    token: string;
    qrData: string;
  };
};
