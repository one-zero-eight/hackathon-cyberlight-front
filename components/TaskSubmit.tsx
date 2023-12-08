import { Lesson, Task } from "@/lib/lesson";
import { Button, Radio, TextInput } from "@mantine/core";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type SolveResponse = {
  success: boolean;
  rewards: number[];
};

export default function TaskSubmit({
  lesson,
  task,
}: {
  lesson: Lesson;
  task: Task;
}) {
  const [textAnswer, setTextAnswer] = useState<string>("");
  const mutation = useMutation<SolveResponse, DefaultError, any>({});
  const [radioAnswer, setRadioAnswer] = useState<string>("-");

  useEffect(() => {
    setTextAnswer("");
    setRadioAnswer("-");
  }, [task]);

  const handleSubmit = () => {
    const body: { [key: string]: any } = {
      lesson_id: lesson.id,
      task_id: task.id,
      task_type: task.type,
    };

    if (task.type === "input") {
      body.input_answer = textAnswer;
    } else if (task.type === "radio" || task.type === "instant") {
      body.choices = [radioAnswer];
    } else if (task.type === "multichoice") {
      body.choices = [];
    } else {
      // Nothing
    }

    mutation.mutate({
      url: `/lessons/solve`,
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
      ) : task.type === "radio" && task.choices ? (
        <Radio.Group value={radioAnswer} onChange={setRadioAnswer}>
          {task.choices.map((choice, i) => (
            <Radio
              key={i}
              label={choice}
              value={i.toString()}
              className="my-2"
            />
          ))}
        </Radio.Group>
      ) : (
        <></>
      )}
      <div>
        <Button
          onClick={() => handleSubmit()}
          disabled={
            (task.type === "input" && textAnswer === "") ||
            (task.type === "radio" && radioAnswer === "-")
          }
          loading={mutation.isPending}
          loaderProps={{ type: "dots" }}
        >
          Отправить
        </Button>
      </div>
      {mutation.data &&
        (mutation.data.success ? (
          <p>Верно! Награда: {mutation.data.rewards.join(", ")}</p>
        ) : (
          <p>Неверно!</p>
        ))}
    </div>
  );
}
