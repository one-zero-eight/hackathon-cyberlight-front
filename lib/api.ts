import { getAuthorizationHeader } from "@/lib/auth";
import {
  MutationFunction,
  QueryClient,
  QueryFunction,
} from "@tanstack/react-query";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const [url] = queryKey as string[];
  const res = await fetch(API_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(),
    },
  });
  return (await res.json()) as any;
};

const defaultMutationFn: MutationFunction = async (variables) => {
  const { url, method } = variables as {
    url: string;
    method: string;
  };

  const res = await fetch(API_URL + url, {
    method: method || "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(),
    },
    body: JSON.stringify(variables),
  });

  return (await res.json()) as any;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
    mutations: {
      mutationFn: defaultMutationFn,
    },
  },
});
