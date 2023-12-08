import React from "react";
import Layout from "@/components/Layout";
import { Container, Title } from "@mantine/core";

export default function Page() {
  return (
    <Layout>
      <Container className="block">
        <Title order={1}>Профиль</Title>
      </Container>
    </Layout>
  );
}
