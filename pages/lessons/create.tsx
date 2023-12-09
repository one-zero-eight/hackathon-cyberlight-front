import Layout from "@/components/Layout";
import { useRequireAdmin } from "@/lib/auth";
import { Button, Container, TextInput } from "@mantine/core";
import {
  DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  useRequireAdmin();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(5);

  const queryClient = useQueryClient();
  const mutation = useMutation<any, DefaultError, any>({});
  const mutationNewTask = useMutation<any, DefaultError, any>({});
  const mutationSetTasks = useMutation<any, DefaultError, any>({});

  const handleSave = () => {
    mutation.mutate(
      {
        url: "/lessons/",
        method: "POST",
        body: {
          title: title,
          content: "",
          difficulty: difficulty,
          alias: title.toLowerCase().replace(/\s/g, "-"),
        },
      },
      {
        onSuccess: (lesson) => {
          mutationNewTask.mutate(
            {
              url: `/lessons/tasks/`,
              method: "POST",
              body: {
                title: "",
                alias: (Math.random() * 1e10).toString(16),
                content: "",
                type: "empty",
              },
            },
            {
              onSuccess: (data) => {
                mutationSetTasks.mutate(
                  {
                    url: `/lessons/${lesson.id}/tasks`,
                    method: "PUT",
                    body: lesson.tasks
                      .map((task: any) => task.id)
                      .concat(data.id),
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: [`/lessons/${lesson.id}`],
                      });
                      router.push(`/lessons/${lesson.id}/${data.id}/edit`);
                    },
                  },
                );
              },
            },
          );
        },
      },
    );
  };

  return (
    <Layout>
      <Container className="flex flex-col gap-2">
        <h1 className="text-2xl">Новый урок</h1>
        <TextInput
          label="Название"
          placeholder="Введите заголовок урока"
          className="w-96"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />

        <div className="w-fit">
          <Button onClick={handleSave}>Продолжить</Button>
        </div>
      </Container>
    </Layout>
  );
}
