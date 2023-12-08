import Layout from "@/components/Layout";
import { Lesson } from "@/lib/lesson";
import { Container, Paper, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const lessonId =
    router.query.lessonId !== undefined
      ? Number(router.query.lessonId)
      : undefined;
  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/lessons/${lessonId}`],
    enabled: lessonId !== undefined,
  });

  useEffect(() => {
    if (lesson === undefined || lesson.tasks.length === 0) {
      return;
    }

    router.push(`/lessons/${lesson.id}/${lesson.tasks[0].id}/edit`);
  }, [lesson, router]);

  return (
    <Layout>
      <Container className="flex flex-col gap-2">
        <Skeleton>
          <Paper className="h-10 w-full"></Paper>
        </Skeleton>
        <Skeleton>
          <Paper className="h-[300px] w-full"></Paper>
        </Skeleton>
        <Skeleton>
          <Paper className="h-[200px] w-full"></Paper>
        </Skeleton>
      </Container>
    </Layout>
  );
}
