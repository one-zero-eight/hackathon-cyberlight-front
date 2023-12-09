import Layout from "@/components/Layout";
import Steps from "@/components/Steps";
import TaskContent from "@/components/TaskContent";
import TaskSubmit from "@/components/TaskSubmit";
import { Lesson } from "@/lib/lesson";
import { useAccountInfo } from "@/lib/useAccountInfo";
import { Button, Paper, Skeleton, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/lessons/by-alias/welcome`],
  });
  const task = lesson?.tasks[step - 2];
  const { account } = useAccountInfo();

  const onSubmit = () => {
    if (account && lesson && step > 4 && account.total_exp < 10 * (step - 2)) {
      // Go to last
      setStep(lesson.tasks.length + 2);
    } else {
      // Go to next
      setStep((prev) => prev + 1);
    }
  };

  return (
    <Layout className="flex items-center justify-center">
      <Paper withBorder shadow="sm" className="max-w-[500px]">
        <div className="flex flex-col gap-4 p-6">
          {lesson === undefined ? (
            <Skeleton>
              <Paper className="h-10 w-96"></Paper>
            </Skeleton>
          ) : (
            <>
              <Steps count={lesson.tasks.length + 2} step={step} />
              {step === 1 ? (
                <>
                  <Title order={1}>{lesson?.title}</Title>
                  <Text>{lesson?.content}</Text>
                  <Button onClick={() => setStep((prev) => prev + 1)}>
                    Пройти опрос
                  </Button>
                </>
              ) : task ? (
                <>
                  <TaskContent content={task.content} />
                  <TaskSubmit
                    lesson={lesson}
                    task={task}
                    showSuccess={false}
                    onSubmit={onSubmit}
                  />
                </>
              ) : (
                <>
                  <Title order={1}>
                    Ваш уровень определен:{" "}
                    {(account?.total_exp ?? 0) < 20
                      ? "новичок"
                      : (account?.total_exp ?? 0) < 50
                        ? "продвинутый"
                        : "эксперт"}
                  </Title>
                  <p className="my-2">
                    Поздравляем! Вы успешно завершили наш чекап по
                    Кибербезопасности. Ваши результаты отражают ваш уровень
                    знаний в этой важной области. Нажимай на кнопку ниже и
                    переходи на нашу платформу!
                  </p>
                  <Button onClick={() => router.replace("/profile")}>
                    Отлично!
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </Paper>
    </Layout>
  );
}
