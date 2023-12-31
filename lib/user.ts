import { MyFetchError } from "@/lib/api";
import { AUTH_TOKEN_KEY, getAuthToken } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useIsClient, useLocalStorage, useReadLocalStorage } from "usehooks-ts";

export type User = {
  id: number;
  login: string;
  name: string;
  role: "default" | "admin";
  email: string;
};

export function useUser() {
  const { data: user, error } = useQuery<User, MyFetchError>({
    queryKey: ["/users/me"],
  });
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

  useEffect(() => {
    if (error) {
      console.log("Error while fetching user", error);
      if (error.status === 401) {
        setStoredUser(undefined);
      }
    }
  }, [error, setStoredUser]);

  return {
    loggedIn:
      isClient &&
      authToken !== undefined &&
      (user !== undefined || storedUser !== undefined),
    user: isClient ? user || storedUser : undefined,
  };
}
