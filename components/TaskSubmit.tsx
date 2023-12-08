import { Task } from "@/lib/lesson";
import { Button, TextInput } from "@mantine/core";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useState } from "react";

type SolveResponse = {
  is_success: boolean;
  reward: number;
};

export default function TaskSubmit({ task }: { task: Task }) {
  const [textAnswer, setTextAnswer] = useState<string>("");
  const mutation = useMutation<SolveResponse, DefaultError, any>({});

  const handleSubmit = () => {
    const body: { [key: string]: any } = {
      task_type: task.type,
    };

    if (task.type === "input") {
      body.input_answer = textAnswer;
    } else if (task.type === "radio" || task.type === "instant") {
      body.choices = [];
    } else if (task.type === "multichoice") {
      body.choices = [];
    } else {
      // Nothing
    }

    mutation.mutate({
      url: `/lessons/tasks/${task.id}/solve`,
      body: body,
    });
  };

  return (
    <div className="flex w-fit flex-col gap-2">
      {task.type === "input" ? (
        <TextInput
          label="Ответ"
          placeholder="Введите ваш ответ"
          value={textAnswer}
          onChange={(event) => setTextAnswer(event.currentTarget.value)}
        />
      ) : task.type === "radio" ? (
        <></>
      ) : (
        <></>
      )}
      <Button onClick={() => handleSubmit()}>Отправить</Button>
      {mutation.data &&
        (mutation.data.is_success ? (
          <p>Верно! Получено: {mutation.data.reward} баллов</p>
        ) : (
          <p>Неверно! Получено: {mutation.data.reward} баллов</p>
        ))}
    </div>
  );
}
