import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { useElementWidth } from "@/hooks/useElementWidth";
import {
  Button,
  Card,
  Chip,
  Container,
  Rating,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import Parser from "rss-parser";

type FeedItem =
  | {
      loading: false;
      title: string;
      link: string;
      publishDate: Date;
      content: string;
      difficulty: number;
    }
  | {
      loading: true;
    };

export default function Page() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["rss"],
    queryFn: async () => {
      const parser = new Parser({ customFields: { item: ["difficulty"] } });
      const res = await fetch("/rss.xml");
      const text = await res.text();
      const feed = await parser.parseString(text);
      return feed;
    },
  });

  const [orderBy, setOrderBy] = useState<"date-asc" | "date-desc">("date-desc");
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const items = data?.items ?? [];
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const columnCount = width < 768 ? 1 : width < 960 ? 2 : 3;

  const news: FeedItem[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (
      item.contentSnippet &&
      item.link &&
      item.title &&
      item.difficulty != null &&
      item.pubDate
    ) {
      news.push({
        loading: false,
        title: item.title,
        link: item.link,
        content: item.contentSnippet,
        difficulty:
          item.difficulty == null ? 0 : Number.parseInt(item.difficulty),
        publishDate: new Date(item.pubDate),
      });
    }
  }

  const columns: FeedItem[][] = [];
  for (let i = 0; i < columnCount; i++) {
    columns.push([]);
  }

  if (isLoading) {
    for (let i = 0; i < columnCount; i++) {
      columns[i].push({ loading: true }, { loading: true }, { loading: true });
    }
  } else {
    news.sort((a, b) => {
      if (a.loading || b.loading) {
        return 0;
      } else if (orderBy === "date-asc") {
        return a.publishDate.getTime() - b.publishDate.getTime();
      } else if (orderBy === "date-desc") {
        return b.publishDate.getTime() - a.publishDate.getTime();
      } else {
        return 0;
      }
    });

    news
      .filter((item) => {
        if (difficulty == null) {
          return true;
        } else {
          return !item.loading && item.difficulty === difficulty;
        }
      })
      .forEach((item, i) => {
        columns[i % columnCount].push(item);
      });
  }

  return (
    <Layout>
      <Container>
        <Section title="Новости из кибер-мира">
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p>Сортировать по:</p>
              <Chip
                checked={orderBy === "date-asc" || orderBy === "date-desc"}
                icon={
                  <span
                    className={clsx(
                      "text-[16px]",
                      orderBy === "date-asc"
                        ? "icon-[mdi--sort-clock-ascending]"
                        : "icon-[mdi--sort-clock-descending]",
                    )}
                  ></span>
                }
                onChange={() => {
                  if (orderBy === "date-asc") {
                    setOrderBy("date-desc");
                  } else {
                    setOrderBy("date-asc");
                  }
                }}
              >
                Дате публикации
              </Chip>
            </div>

            <div className="flex items-center gap-2">
              <p>Сложность:</p>
              <Rating
                count={3}
                color="blue"
                size="lg"
                value={difficulty ?? 0}
                onChange={(value) => {
                  if (value === difficulty) {
                    setDifficulty(null);
                  } else {
                    setDifficulty(value);
                  }
                }}
              />
            </div>
          </div>

          <div className="my-4 flex gap-2" ref={ref}>
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

                      <div className="flex flex-col gap-2">
                        <Skeleton visible={item.loading} className="w-full">
                          <div className="flex items-center gap-2 text-sm">
                            <p className="font-medium">Сложность:</p>
                            <Rating
                              value={item.loading ? 0 : item.difficulty}
                              color="blue"
                              size="sm"
                              count={3}
                              readOnly={true}
                            />
                          </div>
                        </Skeleton>

                        <Skeleton visible={item.loading} className="w-full">
                          <div className="flex items-center gap-2 text-sm">
                            <p className="font-medium">Дата публикации:</p>
                            <time>
                              {item.loading
                                ? "xx.xx.xxxx xx:xx:xx"
                                : item.publishDate.toLocaleDateString("ru-RU", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                            </time>
                          </div>
                        </Skeleton>
                      </div>

                      <Skeleton visible={item.loading} className="w-full">
                        <Button
                          variant="outline"
                          fullWidth
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
          </div>
        </Section>
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
