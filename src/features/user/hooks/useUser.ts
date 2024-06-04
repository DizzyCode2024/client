import { User } from "../types";

export function useUser() {
  // TODO: call useQuery to update user data from server
  const user: User = null;

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // TODO: update the user in the query cache
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
  }

  return { user, updateUser, clearUser };
}
