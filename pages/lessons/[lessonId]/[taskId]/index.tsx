import Layout from "@/components/Layout";
import TaskContent from "@/components/TaskContent";
import TaskInput from "@/components/TaskInput";
import { Lesson } from "@/lib/lesson";
import { Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const lessonId =
    router.query.lessonId !== undefined
      ? Number(router.query.lessonId)
      : undefined;
  const taskId =
    router.query.taskId !== undefined ? Number(router.query.taskId) : undefined;

  const { data: lesson } = useQuery<Lesson>({
    queryKey: [`/tests/${lessonId}`],
    enabled: lessonId !== undefined,
  });
  const task = lesson?.tasks[Number(taskId)];

  return (
    <Layout>
      <Container className="flex flex-col gap-2 p-4">
        <h1>
          Урок: {lessonId}, задание: {taskId}
        </h1>
        {task && (
          <>
            <TaskContent content={task.content} />
            {task.type === "input" ? (
              <TaskInput task={task} />
            ) : (
              "Неизвестный тип задания"
            )}
          </>
        )}
      </Container>
    </Layout>
  );
}
