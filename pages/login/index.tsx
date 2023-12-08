import { Button, Paper, TextInput, Title, em } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSignInByCredentials } from "@/lib/auth";
import Layout from "@/components/Layout";

export default function Page() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => {
        if (!val.includes("@")) {
          return "Email должен содержать @";
        }
      },
      password: (val) => {
        if (val.length < 6) {
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
          onSubmit={form.onSubmit(({ email, password }) =>
            signIn.mutate({ login: email, password }),
          )}
        >
          <h1 className="text-center text-2xl font-medium">Вход</h1>
          {signIn.isError && (
            <p className="text-red-500">Неверный логин или пароль.</p>
          )}
          <TextInput
            size="md"
            placeholder="E-mail"
            {...form.getInputProps("email")}
          />
          <TextInput
            size="md"
            placeholder="Пароль"
            {...form.getInputProps("password")}
          />
          <Button type="submit">Войти</Button>
        </form>
      </Paper>
    </Layout>
  );
}
