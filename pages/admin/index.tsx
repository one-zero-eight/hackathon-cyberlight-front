import Layout from "@/components/Layout";
import { Button, Container, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";

export default function Page() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Layout>
      <Container className="block">
        <Title order={1}>Администрирование</Title>
        <Title order={3}>Получить отчет</Title>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <DateInput
              value={startDate}
              onChange={setStartDate}
              label="Начало"
              placeholder="Введите дату начала периода"
            />
            <DateInput
              value={endDate}
              onChange={setEndDate}
              label="Конец"
              placeholder="Введите дату конца периода"
            />
          </div>
          <div>
            <Button>Скачать</Button>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
