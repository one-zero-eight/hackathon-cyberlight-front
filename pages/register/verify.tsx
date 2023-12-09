import Layout from "@/components/Layout";
import { useAuthToken } from "@/lib/auth";
import { Button, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const email = router.query.email as string;
  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (val) => {
        if (val.length !== 6) {
          return "Код должен быть длиной 6 символов";
        }
      },
    },
  });
  const queryClient = useQueryClient();
  const [_, setToken] = useAuthToken();
  const registerVerify = useMutation<any, DefaultError, any>({});

  return (
    <Layout className="flex items-center justify-center">
      <Paper withBorder shadow="sm" className="w-full max-w-[300px] p-4">
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit(({ code }) =>
            registerVerify.mutate(
              {
                url: `/auth/finish-registration?email=${email}&code=${code}`,
              },
              {
                onSuccess: (data) => {
                  setToken(data.token);
                  localStorage.removeItem("user");
                  window.dispatchEvent(new Event("local-storage"));
                  queryClient.clear();
                  router.replace(`/checkup`);
                },
              },
            ),
          )}
        >
          <h1 className="text-center text-2xl font-medium">
            На почту отправлено письмо
          </h1>
          <TextInput
            size="md"
            placeholder="Код"
            type="text"
            required
            {...form.getInputProps("code")}
          />
          {registerVerify.isError && (
            <p className="text-red-500">Неверный логин или пароль.</p>
          )}
          <Button
            type="submit"
            loading={registerVerify.isPending}
            loaderProps={{ type: "dots" }}
          >
            Подтвердить
          </Button>
        </form>
      </Paper>
    </Layout>
  );
}
