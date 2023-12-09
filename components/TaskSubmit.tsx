import { API_URL } from "@/lib/api";
import { Lesson, Task } from "@/lib/lesson";
import { Reward } from "@/lib/rewards";
import { Button, Modal, Radio, TextInput } from "@mantine/core";
import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

type SolveResponse = {
  success: boolean;
  rewards: number[];
};

export default function TaskSubmit({
  lesson,
  task,
  showSuccess = true,
  onSubmit = undefined,
}: {
  lesson: Lesson;
  task: Task;
  showSuccess?: boolean;
  onSubmit?: () => void;
}) {
  const [textAnswer, setTextAnswer] = useState<string>("");
  const mutation = useMutation<SolveResponse, DefaultError, any>({});
  const [radioAnswer, setRadioAnswer] = useState<string>("-");

  const queryClient = useQueryClient();
  const { data: rewards } = useQuery<Reward[]>({ queryKey: ["/rewards/"] });
  const [rewardsModalData, setRewardsModalData] = useState<number[]>([]);
  const currentRewardModal = rewards?.filter(
    (v) => v.id === rewardsModalData[0],
  )[0];

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

    mutation.mutate(
      {
        url: `/lessons/solve`,
        body: body,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["/personal_account/"],
          });
          if (onSubmit) {
            onSubmit();
          } else {
            setRewardsModalData((prev) => [...prev, ...data.rewards]);
          }
        },
      },
    );
  };

  return (
    <div className="flex w-fit flex-col gap-2">
      {task.type === "input" ? (
        <>
          <TextInput
            label="Ответ"
            placeholder="Введите ваш ответ"
            value={textAnswer}
            onChange={(event) => setTextAnswer(event.currentTarget.value)}
          />
          <div>
            <Button
              onClick={() => handleSubmit()}
              disabled={task.type === "input" && textAnswer === ""}
              loading={mutation.isPending}
              loaderProps={{ type: "dots" }}
            >
              Отправить
            </Button>
          </div>
        </>
      ) : task.type === "radio" && task.choices ? (
        <>
          <Radio.Group value={radioAnswer} onChange={setRadioAnswer}>
            {task.choices.map((choice, i) => (
              <Radio
                key={i}
                label={choice}
                value={i.toString()}
                className="my-2"
              />
            ))}
            <div>
              <Button
                onClick={() => handleSubmit()}
                disabled={task.type === "radio" && radioAnswer === "-"}
                loading={mutation.isPending}
                loaderProps={{ type: "dots" }}
              >
                Отправить
              </Button>
            </div>
          </Radio.Group>
        </>
      ) : (
        <>
          <div className="mt-4">
            <Button
              onClick={() => handleSubmit()}
              loading={mutation.isPending}
              loaderProps={{ type: "dots" }}
            >
              Прочитал
            </Button>
          </div>
        </>
      )}
      {showSuccess
        ? mutation.data &&
          mutation.variables.body.task_id === task.id &&
          (mutation.data.success ? <p>Отлично!</p> : <p>Неверно!</p>)
        : null}
      <Modal
        opened={currentRewardModal !== undefined}
        onClose={() => setRewardsModalData((prev) => prev.slice(1))}
        title={currentRewardModal?.name}
        centered
        size="auto"
      >
        <img
          src={API_URL + "/" + currentRewardModal?.image}
          className="max-w-lg"
        />
        <p className="text-center">{currentRewardModal?.content}</p>
      </Modal>
    </div>
  );
}
