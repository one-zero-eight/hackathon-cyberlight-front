import Layout from "@/components/Layout";
import { Lesson } from "@/lib/lesson";
import { Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

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

  return (
    <Layout>
      <Container className="flex flex-col gap-2">
        <h1 className="text-2xl">{lesson?.title}</h1>
      </Container>
    </Layout>
  );
}
