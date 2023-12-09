import Layout from "@/components/Layout";
import { Container, Paper, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export type LeaderboardRecord = {
  id: number;
  name: string;
  total_exp: number;
};

export default function Page() {
  const { data: leaderboard } = useQuery<LeaderboardRecord[]>({
    queryKey: ["/personal_account/leaderboard"],
  });
  return (
    <Layout>
      <Container className="flex flex-col">
        <Title order={1}>Рейтинг</Title>
        <Paper className="flex flex-col p-8" shadow="md">
          {leaderboard?.map((record) => (
            <div key={record.id} className="flex flex-row items-center gap-2">
              <span className="icon-[mdi--trophy] text-yellow-900" />
              <p>
                {record.name || "Аноним"} - {record.total_exp} xp
              </p>
            </div>
          ))}
        </Paper>
      </Container>
    </Layout>
  );
}
