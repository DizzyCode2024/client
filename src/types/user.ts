export interface Id {
  id: number;
}
export interface NewUser {
  email: string;
  username: string;
}

export type User = Id & NewUser;

export type UserId = number;

export interface IUser {
  id: UserId;
  email: string;
  username: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser, token: string) => void;
  clearUser: () => void;
}
