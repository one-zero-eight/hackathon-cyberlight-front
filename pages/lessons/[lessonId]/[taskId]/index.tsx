import Layout from "@/components/Layout";
import TaskContent from "@/components/TaskContent";
import TaskSubmit from "@/components/TaskSubmit";
import { Lesson } from "@/lib/lesson";
import { Button, Container, Divider, Paper, Skeleton } from "@mantine/core";
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
  const task = taskId !== undefined ? lesson?.tasks[taskId] : undefined;

  return (
    <Layout>
      <Container className="flex flex-col">
        <h1 className="mb-2 text-2xl font-bold">{lesson?.title}</h1>
        <Divider />
        <div className="flex">
          <nav className="flex max-w-[200px] shrink-0 flex-col py-4 pr-4">
            {lesson &&
              lesson.tasks.map((task, index) => (
                <Link href={`/lessons/${lesson.id}/${index}`} key={task.id}>
                  <Button variant={taskId === index ? "light" : "subtle"}>
                    {task.title}
                  </Button>
                </Link>
              ))}
            <Link href={`/lessons/${lesson?.id}/edit`}>
              <Button variant="subtle" color="gray">
                Изменить
              </Button>
            </Link>
          </nav>
          <Divider orientation="vertical" />
          <section className="grow p-4">
            <h2 className="mb-4 text-xl font-medium">{task?.title}</h2>

            {lesson && task && (
              <>
                <TaskContent content={task.content} />
                <TaskSubmit lesson={lesson} task={task} />
              </>
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
