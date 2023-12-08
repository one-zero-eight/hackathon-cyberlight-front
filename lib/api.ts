import { getAuthorizationHeader } from "@/lib/auth";
import {
  MutationFunction,
  QueryClient,
  QueryFunction,
} from "@tanstack/react-query";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Custom error
export class MyFetchError extends Error {
  status?: number;
  info: any;
}

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const [url] = queryKey as string[];
  const res = await fetch(API_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(),
    },
  });

  if (!res.ok) {
    const error = new MyFetchError(
      "An error occurred while fetching the data.",
    );
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return (await res.json()) as any;
};

const defaultMutationFn: MutationFunction = async (variables) => {
  const { url, method, body } = variables as {
    url: string;
    method?: string;
    body: any;
  };

  const res = await fetch(API_URL + url, {
    method: method || "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(),
    },
    body: JSON.stringify(body),
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
