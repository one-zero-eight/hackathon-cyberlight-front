import Achievements from "@/components/Achievements";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { useRequireAuth } from "@/lib/auth";
import { Container } from "@mantine/core";
import React from "react";

export default function Page() {
  useRequireAuth();
  return (
    <Layout>
      <Container>
        <Section title="Профиль">
          <Section level={2} title="Достижения">
            <Achievements />
          </Section>
        </Section>
      </Container>
    </Layout>
  );
}
