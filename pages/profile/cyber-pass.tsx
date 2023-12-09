import { useAccountInfo } from "@/api/hooks/useAccountInfo";
import Layout from "@/components/Layout";
import { Container, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Page() {
  const { data: battlePasses } = useQuery({ queryKey: ["/battle-passes/"] });
  const { account } = useAccountInfo();

  return (
    <Layout>
      <Container className="block">
        <Title order={1}>Кибер.Пропуск</Title>
      </Container>
    </Layout>
  );
}
