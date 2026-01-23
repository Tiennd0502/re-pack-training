import { User } from "./user";

export interface LoginPayLoad {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: boolean;
  data: {
    user: User;
  };
}
