import Layout from "@/components/Layout";
import { Lesson } from "@/lib/lesson";
import { Button, Card, Container, Rating, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

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
              shadow="sm"
              padding="lg"
              className="flex max-w-lg flex-col gap-4 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <Title order={3}>{lesson.title}</Title>
              <Rating
                value={lesson.difficulty + 1}
                color="grape"
                size="sm"
                count={10}
                readOnly={true}
              />
              <Text>{lesson.content}</Text>
              <Button
                variant="outline"
                fullWidth
                color="blue"
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
