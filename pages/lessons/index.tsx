import Layout from "@/components/Layout";
import LessonDifficulty from "@/components/LessonDifficulty";
import Section from "@/components/Section";
import { isAvailable, Lesson } from "@/lib/lesson";
import { useAccountInfo } from "@/lib/useAccountInfo";
import { Button, Card, Container, Text, Tooltip } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { data: lessons } = useQuery<Lesson[]>({
    queryKey: ["/lessons/"],
  });
  const { account } = useAccountInfo();

  return (
    <Layout>
      <Container>
        <Section title="Рекомендуемые уроки"></Section>
        <div className="flex flex-wrap items-start gap-3">
          {lessons?.map((lesson) => (
            <div
              key={lesson.id}
              className={clsx(
                isAvailable(lesson, account) ? "" : "grayscale",
                "w-full",
              )}
            >
              <Tooltip
                label="Урок не доступен для вас. Требуется больше опыта"
                position="bottom"
                withArrow
                disabled={isAvailable(lesson, account)}
              >
                <Card shadow="sm" padding="lg">
                  <h3 className="mb-2 text-2xl font-medium">{lesson.title}</h3>
                  <LessonDifficulty
                    maximumDifficulty={10}
                    difficulty={lesson.difficulty + 1}
                    withTooltip
                    className="mb-2"
                  />
                  <Text>{lesson.content}</Text>
                  <Button
                    className="mt-4"
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
