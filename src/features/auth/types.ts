export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  email: string | null;
  token: string | null;
  setUser: (user: User, email: string, token: string) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}
