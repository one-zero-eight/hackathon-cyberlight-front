import { useCustomEditor } from "@/components/CustomEditor";
import Layout from "@/components/Layout";
import TaskContentEditor from "@/components/TaskContentEditor";
import { Lesson } from "@/lib/lesson";
import {
  Button,
  Container,
  Divider,
  Paper,
  Rating,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { DefaultError, useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const lessonId =
    router.query.lessonId !== undefined
      ? Number(router.query.lessonId)
      : undefined;
  const taskId =
    router.query.taskId !== undefined ? Number(router.query.taskId) : undefined;

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/lessons/${lessonId}`],
    enabled: lessonId !== undefined,
  });
  const task =
    taskId !== undefined
      ? lesson?.tasks.filter((task) => task.id === taskId)[0]
      : undefined;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(5);

  const [taskTitle, setTaskTitle] = useState("");

  const mutationLesson = useMutation<any, DefaultError, any>({});
  const mutationUpdateTask = useMutation<any, DefaultError, any>({});
  const mutationNewTask = useMutation<any, DefaultError, any>({});
  const mutationSetTasks = useMutation<any, DefaultError, any>({});

  const editor = useCustomEditor({});

  useEffect(() => {
    if (lesson === undefined) {
      return;
    }

    setTitle(lesson.title ?? "");
    setDescription(lesson.content ?? "");
    setDifficulty(lesson.difficulty);
  }, [lesson]);

  useEffect(() => {
    if (task === undefined) {
      return;
    }

    setTaskTitle(task.title || "");
  }, [task]);

  const handleSave = () => {
    if (lesson === undefined) {
      return;
    }

    mutationLesson.mutate({
      url: `/lessons/${lesson.id}`,
      method: "PUT",
      body: {
        title: title,
        content: description,
        difficulty: difficulty,
      },
    });
  };

  const handleNewTask = () => {
    if (lesson === undefined) {
      return;
    }

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
              body: lesson.tasks.map((task) => task.id).concat(data.id),
            },
            {
              onSuccess: () => {
                router.push(`/lessons/${lesson.id}/${data.id}/edit`);
              },
            },
          );
        },
      },
    );
  };

  const handleTaskSave = () => {
    if (!editor) return;
    const content = editor.getJSON();
    mutationUpdateTask.mutate({
      url: `/lessons/tasks/${taskId}`,
      method: "PUT",
      body: {
        title: taskTitle,
        content: JSON.stringify(content),
      },
    });
  };

  return (
    <Layout>
      <Container className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <TextInput
              label="Название"
              placeholder="Введите заголовок урока"
              className="w-96"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
            <TextInput
              label="Описание"
              placeholder="Введите описание урока"
              className="w-96"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
            <Text size="sm">Сложность</Text>
            <Rating
              value={difficulty + 1}
              onChange={(v) => setDifficulty(v - 1)}
              color="grape"
              size="lg"
              count={10}
            />
          </div>
          <Button
            variant="filled"
            color="green"
            leftSection={<IconCheck size={14} />}
            onClick={handleSave}
            loading={mutationLesson.isPending}
            loaderProps={{ type: "dots" }}
          >
            Сохранить
          </Button>
        </div>
        <Divider className="mt-2" />
        <div className="flex">
          <nav className="flex max-w-[200px] shrink-0 flex-col py-4 pr-4">
            {lesson &&
              lesson.tasks.map((task) => (
                <Link
                  href={`/lessons/${lesson.id}/${task.id}/edit`}
                  key={task.id}
                >
                  <Button variant={taskId === task.id ? "light" : "subtle"}>
                    {task.title || "Без названия"}
                  </Button>
                </Link>
              ))}
            <Button
              variant="subtle"
              color="blue"
              onClick={handleNewTask}
              rightSection={<IconPlus size={14} />}
              loading={mutationNewTask.isPending || mutationSetTasks.isPending}
            >
              Добавить
            </Button>
          </nav>
          <Divider orientation="vertical" />
          <section className="flex grow flex-col gap-4 p-4">
            {(lessonId !== undefined && taskId !== undefined && editor && (
              <>
                <TextInput
                  value={taskTitle}
                  onChange={(event) => setTaskTitle(event.currentTarget.value)}
                />
                <TaskContentEditor
                  lessonId={Number(lessonId)}
                  taskId={Number(taskId)}
                  editor={editor}
                />
                <div>
                  <Button
                    variant="filled"
                    color="green"
                    leftSection={<IconCheck size={14} />}
                    onClick={handleTaskSave}
                    loading={mutationUpdateTask.isPending}
                    loaderProps={{ type: "dots" }}
                  >
                    Сохранить
                  </Button>
                </div>
              </>
            )) || (
              <Skeleton>
                <Paper className="h-[100px] w-full"></Paper>
              </Skeleton>
            )}
          </section>
        </div>
      </Container>
    </Layout>
  );
}
