import "@/styles/globals.css";
import { queryClient } from "@/lib/api";
import { useUser } from "@/lib/user";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // Prefetch data
  const _ = useUser();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
