export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
}
