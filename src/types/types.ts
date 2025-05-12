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

  ResidentList: {
    token: string;
    user: User;
  };

  ExitRegistration: {
    token: string;
  };
};
