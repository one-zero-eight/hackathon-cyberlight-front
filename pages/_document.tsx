import { ColorSchemeScript } from "@mantine/core";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <noscript className="flex w-full justify-center bg-red-700 p-8">
          Включите JavaScript в браузере для корректной работы страницы.
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
