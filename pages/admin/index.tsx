import Layout from "@/components/Layout";
import { API_URL } from "@/lib/api";
import { getAuthorizationHeader } from "@/lib/auth";
import { Button, Container, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data: report } = useQuery<any>({
    queryKey: ["/report/"],
    queryFn: async () => {
      const response = await fetch(API_URL + "/report/", {
        headers: {
          Authorization: getAuthorizationHeader(),
        },
      });
      return response.text();
    },
  });

  const download = () => {
    if (!report) return;

    const blob = new Blob([report], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <Button onClick={download}>Скачать</Button>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
