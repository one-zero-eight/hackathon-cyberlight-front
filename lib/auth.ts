import { API_URL } from "@/lib/api";
import {
  DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";
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
    setToken(undefined);
    queryClient.clear();
  }, [setToken, queryClient]);
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
      queryClient.invalidateQueries();
      router.replace("/");
    },
  });

  return mutation;
}