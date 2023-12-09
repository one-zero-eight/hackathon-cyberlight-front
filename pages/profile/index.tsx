import React from "react";
import { Container } from "@mantine/core";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import Achievements from "@/components/Achievements";

export default function Page() {
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
