import Layout from "@/components/Layout";
import TaskEditor from "@/components/TaskEditor";
import { Container } from "@mantine/core";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const lessonId =
    router.query.lessonId !== undefined
      ? Number(router.query.lessonId)
      : undefined;
  const taskId =
    router.query.taskId !== undefined ? Number(router.query.taskId) : undefined;

  return (
    <Layout>
      <Container className="flex flex-col gap-2 p-4">
        <h1>
          Урок: {lessonId}, задание: {taskId}, редактирование
        </h1>
        {(lessonId !== undefined && taskId !== undefined && (
          <TaskEditor lessonId={Number(lessonId)} taskId={Number(taskId)} />
        )) || <p>Загрузка...</p>}
      </Container>
    </Layout>
  );
}
