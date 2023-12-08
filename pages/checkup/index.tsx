import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button, Paper, Text, Title } from "@mantine/core";
import Steps from "@/components/Steps";

export default function Page() {
  const [stepCount, setStepCount] = useState(10);
  const [step, setStep] = useState(1);

  return (
    <Layout className="flex items-center justify-center">
      <Paper withBorder shadow="sm" className="max-w-[500px]">
        <div className="flex flex-col gap-4 p-6">
          <Steps count={stepCount} step={step} />
          <Title order={1}>Добро пожаловать!</Title>
          <Text>
            Привет! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur condimentum nisl vel urna vehicula egestas. Etiam lacinia
            rutrum elementum.
          </Text>
          <Button onClick={() => setStep((prev) => prev + 1)}>
            Пройти опрос
          </Button>
        </div>
      </Paper>
    </Layout>
  );
}
