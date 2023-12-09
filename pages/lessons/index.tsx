import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Container, Text, Title } from "@mantine/core";
import LessonDifficulty from "@/components/LessonDifficulty";
import { Lesson } from "@/lib/lesson";
import Layout from "@/components/Layout";

export default function Page() {
  const { data: lessons } = useQuery<Lesson[]>({
    queryKey: ["/lessons/"],
  });

  return (
    <Layout>
      <Container className="flex flex-col gap-4">
        <Title order={1}>Рекомендуем пройти:</Title>
        <div className="flex flex-wrap items-start gap-3">
          {lessons?.map((lesson) => (
            <Card
              key={lesson.id}
              shadow="sm"
              padding="lg"
              className="flex max-w-lg flex-col gap-4 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
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
                href={`/lessons/${lesson.id}`}
              >
                Начать урок
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </Layout>
  );
}
