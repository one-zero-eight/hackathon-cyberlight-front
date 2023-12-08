import React, { useEffect, useState } from "react";
import Parser, { Item } from "rss-parser";
import Layout from "@/components/Layout";
import { Container, Paper, Skeleton } from "@mantine/core";
import Link from "next/link";

export default function Page() {
  const [itemsLoading, setItemsLoading] = useState(true);
  const [newsItems, setNewsItems] = useState<Item[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    setItemsLoading(true);
    fetch("/api/rss", { signal: abortController.signal })
      .then((res) => res.text())
      .then((str) => new Parser().parseString(str))
      .then(async (feed) => {
        await sleep(1000);
        return feed;
      })
      .then((feed) => {
        setNewsItems(feed.items ?? []);
      })
      .then(() => {
        setItemsLoading(false);
      })
      .catch((err) => {
        setItemsLoading(false);
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error(err);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Layout>
      <Container className="my-4 flex flex-col gap-4">
        {itemsLoading && (
          <>
            <Skeleton>
              <Paper className="h-[200px] w-full"></Paper>
            </Skeleton>
            <Skeleton>
              <Paper className="h-[200px] w-full"></Paper>
            </Skeleton>
          </>
        )}
        {newsItems.map((item, i) => (
          <Paper shadow="xs" className="p-4" key={i}>
            {item.title && (
              <h3 className="text-lg font-bold">
                <Link href={item.link ?? "#"}>{item.title}</Link>
              </h3>
            )}
            {item.contentSnippet && (
              <p className="text-sm">{item.contentSnippet}</p>
            )}
          </Paper>
        ))}
      </Container>
    </Layout>
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
