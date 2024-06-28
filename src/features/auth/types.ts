export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser, token: string) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}
