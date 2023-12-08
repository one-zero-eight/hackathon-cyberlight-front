import TaskEditor from "@/components/TaskEditor";
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
    <main className="p-4">
      <h1>
        Задание {taskId} урока {lessonId}
      </h1>
      {(lessonId !== undefined && taskId !== undefined && (
        <TaskEditor lessonId={Number(lessonId)} taskId={Number(taskId)} />
      )) || <p>Загрузка...</p>}
    </main>
  );
}
