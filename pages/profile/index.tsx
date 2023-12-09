import Achievements from "@/components/Achievements";
import CyberPass from "@/components/CyberPass";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { useRequireAuth } from "@/lib/auth";
import { Container, Divider } from "@mantine/core";
import React from "react";

export default function Page() {
  useRequireAuth();
  return (
    <Layout>
      <Container>
        <Section title="Дашборд">
          <div className="my-8"></div>
          <Divider />
          <div className="my-8"></div>

          <Section level={2} title="Кибер.Пропуск">
            <div className="p-4">
              <CyberPass />
            </div>
          </Section>

          <div className="my-8"></div>
          <Divider />
          <div className="my-8"></div>

          <Section level={2} title="Достижения">
            <div className="p-4">
              <Achievements />
            </div>
          </Section>
        </Section>
      </Container>
    </Layout>
  );
}
