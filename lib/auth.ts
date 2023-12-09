import { API_URL } from "@/lib/api";
import { User } from "@/lib/user";
import {
  DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const AUTH_TOKEN_KEY = "token";

export function getAuthToken() {
  const value = localStorage.getItem(AUTH_TOKEN_KEY);
  return value ? JSON.parse(value) : undefined;
}

export function getAuthorizationHeader() {
  const token = getAuthToken();
  return token ? `Bearer ${token}` : "";
}

export function useAuthToken() {
  return useLocalStorage<string | undefined>(AUTH_TOKEN_KEY, undefined);
}

export function useSignOut() {
  const [_, setToken] = useAuthToken();
  const queryClient = useQueryClient();
  return useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.dispatchEvent(new Event("local-storage"));
    queryClient.clear();
  }, [queryClient]);
}

export type SignInByCredentialsVariables = {
  login: string;
  password: string;
};

export type SignInByCredentialsResponse = {
  token: string;
};

export function useSignInByCredentials() {
  const queryClient = useQueryClient();
  const [_, setToken] = useAuthToken();
  const router = useRouter();
  const mutation = useMutation<
    SignInByCredentialsResponse,
    DefaultError,
    SignInByCredentialsVariables
  >({
    mutationFn: async ({ login, password }) => {
      return fetch(API_URL + "/auth/by-credentials", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Неверный логин или пароль");
        }
        return res.json() as Promise<SignInByCredentialsResponse>;
      });
    },
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("local-storage"));
      queryClient.clear();
      router.replace("/");
    },
  });

  return mutation;
}

export function useRequireAuth() {
  const router = useRouter();
  const [token] = useAuthToken();

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace("/login");
    }
  }, [token]);
}

export function useRequireAdmin() {
  const router = useRouter();
  const [token] = useAuthToken();
  const [storedUser] = useLocalStorage<User | undefined>("user", undefined);

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace("/login");
    } else if (!storedUser) {
    } else if (storedUser.role !== "admin") {
      router.replace("/");
    }
  }, [token, storedUser]);
}
