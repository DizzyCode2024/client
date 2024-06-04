// { signin,signout, signup }
import axios, { AxiosResponse } from "axios";

interface IUseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

export function useAuthActions(): IUseAuth {}
