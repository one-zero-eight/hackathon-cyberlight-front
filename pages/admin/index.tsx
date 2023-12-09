import Layout from "@/components/Layout";
import { Container, Title } from "@mantine/core";
import React from "react";

export default function Page() {
  return (
    <Layout>
      <Container className="block">
        <Title order={1}>Администрирование</Title>
      </Container>
    </Layout>
  );
}
