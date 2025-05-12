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
  AccessDetails: {
    token: string;
  };
  PersonDetail: {
    token: string;
    person: any;
  };
  ExitRegistration: {
    token: string;
  };
};