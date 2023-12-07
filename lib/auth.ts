import { API_URL } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
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

export function useSignInByCredentials() {
  const queryClient = useQueryClient();
  const [_, setToken] = useAuthToken();

  return useCallback(
    async (login: string, password: string) => {
      const res = await fetch(API_URL + "/auth/by-credentials", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log("res.status", res.status);
        if (res.status == 401 || res.status == 403) {
          throw new Error("Неверный логин или пароль");
        } else {
          throw new Error(`Ответ сервера ${res.status}`);
        }
      }
      const data = await res.json();
      setToken(data.token);
      queryClient.clear();
    },
    [setToken, queryClient],
  );
}
