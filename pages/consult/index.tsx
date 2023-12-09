import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { API_URL } from "@/lib/api";
import { Button, Card, Container, Modal, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export type Consultant = {
  id: number;
  name: string;
  description: string;
  image?: string;
  timeslots?: ConsultantTimeslot[];
  appointments?: ConsultantAppointment[];
};

export type ConsultantTimeslot = {
  id: number;
  consultant_id: number;
  day: number;
  start: string;
  end: string;
};

export type ConsultantAppointment = {
  date: string;
  consultant_id: number;
  user_id: number;
  timeslot: ConsultantTimeslot;
  comment?: string;
};

const days: { [key: number]: string } = {
  0: "Понедельник",
  1: "Вторник",
  2: "Среда",
  3: "Четверг",
  4: "Пятница",
  5: "Суббота",
  6: "Воскресенье",
};

export default function Page() {
  const { data: consultants } = useQuery<Consultant[]>({
    queryKey: ["/consultation/consultants/"],
  });

  const [modalConsultantId, setModalConsultantId] = useState<
    number | undefined
  >(undefined);
  const modalConsultant = consultants?.find(
    (consultant) => consultant.id === modalConsultantId,
  );

  return (
    <Layout>
      <Container className="flex flex-col gap-4">
        <Section title="Выберите эксперта">
          <div className="flex flex-wrap items-start gap-3">
            {consultants?.map((consultant) => (
              <Card
                key={consultant.id}
                shadow="sm"
                padding="lg"
                className="flex max-w-lg flex-col gap-4"
              >
                <img
                  src={API_URL + "/" + consultant.image}
                  className="max-h-32 max-w-xs object-cover"
                />
                <Title order={3}>{consultant.name}</Title>
                <Text>{consultant.description}</Text>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setModalConsultantId(consultant.id)}
                >
                  Записаться
                </Button>
              </Card>
            ))}
          </div>
        </Section>
        <Modal
          title={`${modalConsultant?.name}, ${modalConsultant?.description}`}
          opened={modalConsultant !== undefined}
          onClose={() => setModalConsultantId(undefined)}
          size="auto"
        >
          <Text>Выберите дату и время:</Text>
          <div className="mt-4 flex w-fit max-w-lg flex-wrap items-start gap-3">
            {modalConsultant?.timeslots &&
              Object.entries(
                modalConsultant.timeslots.reduce(
                  (prev, ts) => {
                    prev[ts.day] = prev[ts.day] || [];
                    prev[ts.day].push(ts);
                    return prev;
                  },
                  {} as { [key: number]: ConsultantTimeslot[] },
                ),
              ).map(([day, timeslots]) => (
                <Card
                  key={day}
                  shadow="sm"
                  padding="lg"
                  className="flex max-w-lg flex-col gap-4"
                >
                  <Title order={3}>{days[Number(day)]}</Title>
                  {timeslots.map((timeslot) => (
                    <Button
                      key={timeslot.id}
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        console.log(timeslot);
                      }}
                    >
                      {timeslot.start}
                    </Button>
                  ))}
                </Card>
              ))}
          </div>
        </Modal>
      </Container>
    </Layout>
  );
}
