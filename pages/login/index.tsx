import { Button, Paper, TextInput, Title, em } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSignInByCredentials } from "@/lib/auth";
import Layout from "@/components/Layout";

export default function Page() {
  const form = useForm({
    initialValues: {
      login: "",
      password: "",
    },
    validate: {
      login: (val) => {
        if (val.length < 3) {
          return "Логин должен быть длиннее 3 символов";
        }
      },
      password: (val) => {
        if (val.length < 4) {
          return "Пароль должен быть длиннее 4 символов";
        }
      },
    },
  });
  const signIn = useSignInByCredentials();

  return (
    <Layout className="flex items-center justify-center">
      <Paper withBorder shadow="sm" className="w-full max-w-[300px] p-4">
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit(({ login, password }) =>
            signIn.mutate({ login: login, password }),
          )}
        >
          <h1 className="text-center text-2xl font-medium">Вход</h1>
          <TextInput
            size="md"
            placeholder="Логин"
            type="text"
            {...form.getInputProps("login")}
          />
          <TextInput
            size="md"
            placeholder="Пароль"
            type="password"
            {...form.getInputProps("password")}
          />
          {signIn.isError && (
            <p className="text-red-500">Неверный логин или пароль.</p>
          )}
          <Button type="submit">Войти</Button>
        </form>
      </Paper>
    </Layout>
  );
}
