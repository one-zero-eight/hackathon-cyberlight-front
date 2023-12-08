import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button, Container, Paper, Skeleton, Text, Title } from "@mantine/core";

export default function Page() {
  return (
    <Layout>
      <Container className="block pt-4">
        <Title order={1}>Профиль</Title>
      </Container>
    </Layout>
  );
}
