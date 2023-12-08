import { Task } from "@/lib/lesson";
import { Button, TextInput } from "@mantine/core";

export default function TaskInput({ task }: { task: Task }) {
  return (
    <div className="flex w-fit flex-col gap-2">
      <TextInput label="Ответ" placeholder="Введите ваш ответ" />
      <Button>Отправить</Button>
    </div>
  );
}
