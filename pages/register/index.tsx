import Layout from "@/components/Layout";
import { Button, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      login: "",
      password: "",
      email: "",
      name: "",
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
      email: (val) => {
        if (val.length < 4) {
          return "Почта должна быть длиннее 4 символов";
        }
      },
    },
  });
  const register = useMutation<any, DefaultError, any>({});

  return (
    <Layout className="flex items-center justify-center">
      <Paper withBorder shadow="sm" className="w-full max-w-[300px] p-4">
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit(({ login, password, email, name }) =>
            register.mutate(
              {
                url: "/auth/start-registration",
                body: { login, password, email, name },
              },
              {
                onSuccess: () => {
                  router.replace(`/register/verify?email=${email}`);
                },
              },
            ),
          )}
        >
          <h1 className="text-center text-2xl font-medium">Регистрация</h1>
          <TextInput
            size="md"
            placeholder="Логин"
            type="text"
            required
            {...form.getInputProps("login")}
          />
          <TextInput
            size="md"
            placeholder="Почта"
            type="email"
            required
            {...form.getInputProps("email")}
          />
          <TextInput
            size="md"
            placeholder="Имя"
            type="text"
            {...form.getInputProps("name")}
          />
          <TextInput
            size="md"
            placeholder="Пароль"
            type="password"
            required
            {...form.getInputProps("password")}
          />
          {register.isError && (
            <p className="text-red-500">Неверный логин или пароль.</p>
          )}
          <Button
            type="submit"
            loading={register.isPending}
            loaderProps={{ type: "dots" }}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Layout>
  );
}
