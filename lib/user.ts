import { AUTH_TOKEN_KEY, getAuthToken } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useIsClient, useLocalStorage, useReadLocalStorage } from "usehooks-ts";

export type User = {
  id: number;
  login: string;
  name: string;
  role: "default" | "admin";
};

export function useUser() {
  const { data: user } = useQuery<User>({ queryKey: ["/users/me"] });
  const authToken = useReadLocalStorage(AUTH_TOKEN_KEY);
  const [storedUser, setStoredUser] = useLocalStorage<User | undefined>(
    "user",
    undefined,
  );
  const isClient = useIsClient();

  useEffect(() => {
    if (user) {
      setStoredUser(user);
    } else if (getAuthToken() === undefined) {
      setStoredUser(undefined);
    }
  }, [user, setStoredUser]);

  return {
    loggedIn:
      isClient &&
      authToken !== undefined &&
      (user !== undefined || storedUser !== undefined),
    user: isClient ? user || storedUser : undefined,
  };
}
