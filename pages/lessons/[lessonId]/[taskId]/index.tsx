import Layout from "@/components/Layout";
import LessonDifficulty from "@/components/LessonDifficulty";
import TaskContent from "@/components/TaskContent";
import TaskSubmit from "@/components/TaskSubmit";
import { Lesson } from "@/lib/lesson";
import { pluralizeRu } from "@/utils/words";
import { Button, Container, Divider, Paper, Skeleton } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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

  return (
    <Layout>
      <Container className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="mb-3 text-2xl font-bold">{lesson?.title}</h1>

            <div className="mb-3">
              {lesson && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Сложность:</span>
                  <LessonDifficulty
                    maximumDifficulty={10}
                    difficulty={lesson.difficulty + 1}
                    withTooltip
                  />
                </div>
              )}
              {lesson && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Кол-во заданий:</span>
                  <span>
                    {lesson.tasks.length}{" "}
                    {pluralizeRu({
                      n: lesson.tasks.length,
                      one: "задание",
                      few: "задания",
                      many: "заданий",
                    })}
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-800 dark:text-gray-600">
              {lesson?.content}
            </p>
          </div>
          <Link href={`/lessons/${lesson?.id}/${task?.id}/edit`}>
            <Button
              variant="subtle"
              color="gray"
              leftSection={<IconEdit size={14} />}
            >
              Изменить
            </Button>
          </Link>
        </div>
        <Divider className="mt-2" />
        <div className="flex">
          <nav className="flex max-w-[250px] shrink-0 flex-col gap-2 overflow-clip py-4 pr-4">
            {lesson &&
              lesson.tasks.map((task) => (
                <Link href={`/lessons/${lesson.id}/${task.id}`} key={task.id}>
                  <Button
                    variant={taskId === task.id ? "light" : "subtle"}
                    fullWidth
                    styles={{
                      inner: {
                        justifyContent: "flex-start",
                      },
                    }}
                  >
                    {truncate(task.title || "Без названия", 18)}
                  </Button>
                </Link>
              ))}
          </nav>
          <Divider orientation="vertical" />
          <section className="grow p-4">
            <h2 className="mb-4 text-xl font-medium">{task?.title}</h2>

            {lesson && task && (
              <div className="flex flex-col gap-2">
                <TaskContent content={task.content} />
                <TaskSubmit lesson={lesson} task={task} />
              </div>
            )}
          </section>
        </div>
        {isLoading && (
          <>
            <Skeleton>
              <Paper className="h-10 w-full"></Paper>
            </Skeleton>
            <Skeleton>
              <Paper className="h-[300px] w-full"></Paper>
            </Skeleton>
            <Skeleton>
              <Paper className="h-[200px] w-full"></Paper>
            </Skeleton>
          </>
        )}
      </Container>
    </Layout>
  );
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}
