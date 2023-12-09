import { useAccountInfo } from "@/api/hooks/useAccountInfo";
import Layout from "@/components/Layout";
import LessonDifficulty from "@/components/LessonDifficulty";
import { isAvailable, Lesson } from "@/lib/lesson";
import { Button, Card, Container, Text, Title, Tooltip } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { data: lessons } = useQuery<Lesson[]>({
    queryKey: ["/lessons/"],
  });
  const { account } = useAccountInfo();

  return (
    <Layout>
      <Container className="flex flex-col gap-4">
        <Title order={1}>Рекомендуем пройти:</Title>
        <div className="flex flex-wrap items-start gap-3">
          {lessons?.map((lesson) => (
            <div
              key={lesson.id}
              className={isAvailable(lesson, account) ? "" : "grayscale"}
            >
              <Tooltip
                label="Урок не доступен для вас. Требуется больше опыта"
                position="bottom"
                withArrow
                disabled={isAvailable(lesson, account)}
              >
                <Card shadow="sm" padding="lg">
                  <Title order={3}>{lesson.title}</Title>
                  <LessonDifficulty
                    maximumDifficulty={10}
                    difficulty={lesson.difficulty + 1}
                    withTooltip
                  />
                  <Text>{lesson.content}</Text>
                  <Button
                    variant="outline"
                    fullWidth
                    component={Link}
                    href={
                      isAvailable(lesson, account)
                        ? `/lessons/${lesson.id}`
                        : "#"
                    }
                    disabled={!isAvailable(lesson, account)}
                    rightSection={
                      !isAvailable(lesson, account) ? (
                        <IconLock size={16} />
                      ) : undefined
                    }
                  >
                    Начать урок
                  </Button>
                </Card>
              </Tooltip>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
}
