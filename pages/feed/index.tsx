import Layout from "@/components/Layout";
import { useElementWidth } from "@/hooks/useElementWidth";
import { Button, Card, Container, Skeleton, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import Parser from "rss-parser";

type FeedItem =
  | {
      loading: false;
      title: string;
      link: string;
      content: string;
    }
  | {
      loading: true;
    };

export default function Page() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["rss"],
    queryFn: async () => {
      const parser = new Parser();
      const res = await fetch("/api/rss");
      const text = await res.text();
      const feed = await parser.parseString(text);
      return feed;
    },
  });
  const items = data?.items ?? [];
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const columnCount = width < 768 ? 1 : width < 960 ? 2 : 3;

  const columns: FeedItem[][] = [];
  for (let i = 0; i < columnCount; i++) {
    columns.push([]);
  }

  if (isLoading) {
    for (let i = 0; i < columnCount; i++) {
      columns[i].push({ loading: true }, { loading: true }, { loading: true });
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.contentSnippet && item.link && item.title) {
        columns[i % columnCount].push({
          loading: false,
          title: item.title,
          link: item.link,
          content: item.contentSnippet,
        });
      }
    }
  }

  return (
    <Layout>
      <Container>
        <h1 className="text-3xl font-bold">Интересно почитать:</h1>
      </Container>
      <Container className="my-4 flex gap-2" ref={ref}>
        {error && (
          <Card shadow="sm" padding="lg">
            <Title order={3}>Ошибка</Title>
            <Text>{error.message}</Text>
          </Card>
        )}
        {!error &&
          columns.map((column, i) => (
            <div
              key={`${i}/${columnCount}`}
              className={clsx(
                "flex flex-col gap-2",
                columnCount === 1
                  ? "basis-full"
                  : columnCount === 2
                    ? "basis-1/2"
                    : "basis-1/3",
              )}
            >
              {column.map((item, j) => (
                <Card
                  key={`${i}/${j}`}
                  className="flex flex-col gap-4"
                  shadow="sm"
                  padding="lg"
                >
                  <Skeleton
                    visible={item.loading}
                    className="w-full"
                    height={isLoading ? randint(20, 40) : undefined}
                  >
                    <Title order={3}>
                      {item.loading ? "Загрузка..." : item.title}
                    </Title>
                  </Skeleton>

                  <Skeleton
                    visible={item.loading}
                    className="w-full"
                    height={isLoading ? randint(100, 200) : undefined}
                  >
                    <Text>
                      {item.loading
                        ? "Загрузка..."
                        : truncateWords(item.content, 20)}
                    </Text>
                  </Skeleton>

                  <Skeleton visible={item.loading} className="w-full">
                    <Button
                      variant="outline"
                      fullWidth
                      color="blue"
                      component={Link}
                      href={item.loading ? "#" : item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Читать
                    </Button>
                  </Skeleton>
                </Card>
              ))}
            </div>
          ))}
      </Container>
    </Layout>
  );
}

function truncateWords(text: string, maxWords: number) {
  const words = text.split(" ");
  const truncated = words.slice(0, maxWords);
  return truncated.join(" ") + (words.length > maxWords ? "..." : "");
}

function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
