import Layout from "@/components/Layout";
import { Lesson } from "@/lib/lesson";
import { Button, Container, NumberInput, TextInput } from "@mantine/core";
import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const lessonId =
    router.query.lessonId !== undefined
      ? Number(router.query.lessonId)
      : undefined;
  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/lessons/${lessonId}`],
    enabled: lessonId !== undefined,
  });

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(5);

  const queryClient = useQueryClient();
  const mutationLesson = useMutation<any, DefaultError, any>({});
  const mutationNewTask = useMutation<any, DefaultError, any>({});
  const mutationSetTasks = useMutation<any, DefaultError, any>({});

  useEffect(() => {
    if (lesson === undefined) {
      return;
    }

    setTitle(lesson.title ?? "");
    setDifficulty(lesson.difficulty);
  }, [lesson]);

  const handleSave = () => {
    if (lesson === undefined) {
      return;
    }

    mutationLesson.mutate({
      url: `/lessons/${lesson.id}`,
      method: "POST",
      body: {
        title: title,
        content: "",
        difficulty: difficulty,
        alias: title.toLowerCase().replace(/\s/g, "-"),
      },
    });
  };

  const handleNewTask = () => {
    if (lesson === undefined) {
      return;
    }

    mutationNewTask.mutate(
      {
        url: `/lessons/tasks`,
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
          mutationSetTasks.mutate({
            url: `/lessons/${lesson.id}/tasks`,
            method: "PUT",
            body: lesson.tasks.map((task) => task.id).concat(data.id),
          });
        },
      },
    );
  };

  return (
    <Layout>
      <Container className="flex flex-col gap-2">
        <h1 className="text-2xl">Изменить урок</h1>
        <TextInput
          label="Название"
          placeholder="Введите заголовок урока"
          className="w-96"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <NumberInput
          label="Сложность"
          description="Значение от 0 до 10"
          placeholder="5"
          className="w-96"
          min={0}
          max={10}
          value={difficulty}
          onChange={(event) => setDifficulty(Number(event))}
        />

        <div className="flex flex-col gap-2">
          <div className="text-xl">Шаги</div>
          {lesson?.tasks.map((task) => (
            <div key={task.id} className="flex flex-row gap-2">
              <div className="flex h-6 w-6 items-center justify-center self-center rounded-full border-[1px]">
                {task.id}
              </div>
              <TextInput
                placeholder="Введите заголовок шага"
                className="w-96"
                value={task.title}
                onChange={(event) =>
                  mutationNewTask.mutate({
                    url: `/lessons/${lesson.id}/tasks/${task.id}`,
                    method: "POST",
                    body: {
                      title: event.currentTarget.value,
                      alias: task.alias,
                      content: task.content,
                      type: task.type,
                    },
                  })
                }
              />
              <Link
                href={`/lessons/${lessonId}/${task.id}/edit`}
                className="flex self-center text-sm"
              >
                Редактировать
              </Link>
            </div>
          ))}
          <div>
            <Button onClick={() => handleNewTask()}>Добавить шаг</Button>
          </div>
        </div>

        <div className="w-fit">
          <Button onClick={handleSave}>Сохранить</Button>
        </div>
      </Container>
    </Layout>
  );
}
