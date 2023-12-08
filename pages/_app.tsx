import "@/styles/globals.css";
import { queryClient } from "@/lib/api";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

const theme = createTheme({
  primaryColor: "green",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
