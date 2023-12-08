import Layout from "@/components/Layout";
import { Lesson } from "@/lib/lesson";
import { Container, Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Page() {
  const { data: lessons } = useQuery<Lesson[]>({
    queryKey: ["/lessons/"],
  });

  return (
    <Layout>
      <Container className="flex flex-col gap-2">
        <h1 className="text-2xl">Уроки</h1>
        {lessons?.map((lesson) => (
          <Paper key={lesson.id}>
            <Link href={`/lessons/${lesson.id}`}>{lesson.title}</Link>
          </Paper>
        ))}
      </Container>
    </Layout>
  );
}
