import { useSignInByCredentials } from "@/lib/auth";
import { Button, TextInput } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useSignInByCredentials();

  return (
    <main className="flex h-screen w-full justify-center bg-gradient-to-br from-green-50 to-green-300 p-4">
      <div className="flex h-fit w-fit flex-col gap-2 self-center rounded-lg border-2 bg-white p-6">
        <h1 className="text-center text-2xl">Войдите</h1>
        {mutation.isError && (
          <p className="text-red-500">Неверный логин или пароль.</p>
        )}
        <TextInput
          size="md"
          label="Логин"
          placeholder="Введите логин"
          value={login}
          onChange={(event) => setLogin(event.currentTarget.value)}
          disabled={mutation.isPending}
        />
        <TextInput
          size="md"
          label="Пароль"
          placeholder="Введите пароль"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          disabled={mutation.isPending}
        />
        <Button
          onClick={() => {
            mutation.mutate({ login, password });
          }}
        >
          Ок
        </Button>
        <Link href="/" className="text-center text-xs text-gray-500">
          На главную
        </Link>
      </div>
    </main>
  );
}
