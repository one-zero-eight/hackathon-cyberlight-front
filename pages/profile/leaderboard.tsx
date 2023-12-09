import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { Container, Paper, Table, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export type LeaderboardRecord = {
  id: number;
  name: string;
  total_exp: number;
};

export default function Page() {
  const { data: leaders } = useQuery<LeaderboardRecord[]>({
    queryKey: ["/personal_account/leaderboard"],
  });

  const rows =
    leaders?.map((leader, i) => (
      <Table.Tr key={i}>
        <Table.Td>
          {i === 0 && (
            <span className="icon-[mdi--medal-outline] align-middle text-[24px] text-[#ffd700]"></span>
          )}
          {i === 1 && (
            <span className="icon-[mdi--medal-outline] align-middle text-[24px] text-[#c0c0c0]"></span>
          )}
          {i === 2 && (
            <span className="text-m icon-[mdi--medal-outline] align-middle text-[24px] text-[#cd7fr2]"></span>
          )}
        </Table.Td>
        <Table.Td>{i + 1}</Table.Td>
        <Table.Td>{leader.name || "Аноним"}</Table.Td>
        <Table.Td>{leader.total_exp}</Table.Td>
      </Table.Tr>
    )) ?? [];

  return (
    <Layout>
      <Container>
        <Section title="Рейтинг">
          <Table className="m-auto max-w-[500px]">
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>Рейтинг</Table.Th>
                <Table.Th>Имя</Table.Th>
                <Table.Th>Опыт</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Section>
      </Container>
    </Layout>
  );
}
