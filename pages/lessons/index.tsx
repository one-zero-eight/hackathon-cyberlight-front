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
        <h1 className="text-3xl font-bold">Уроки</h1>
        <div className="flex flex-wrap items-start gap-3">
          {lessons?.map((lesson) => (
            <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
              <Paper
                withBorder
                className="inline-block p-4 hover:border-green-500"
              >
                {lesson.title}
              </Paper>
            </Link>
          ))}
        </div>
      </Container>
    </Layout>
  );
}
