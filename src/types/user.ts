export interface Id {
  id: number;
}
export interface NewUser {
  email: string;
  username: string;
}

export type User = Id & NewUser;
