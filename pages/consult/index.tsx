import Layout from "@/components/Layout";
import { Button, Card, Container, Modal, Text, Title } from "@mantine/core";
import React, { useState } from "react";

export default function Page() {
  const consultants = [
    {
      id: 1,
      name: "Антон",
      description: "Специалист по киберугрозам",
      image: "/spec.jpg",
      timeslots: {
        "2021-10-01": [
          { id: 1, time: "10:00" },
          { id: 2, time: "11:00" },
          { id: 3, time: "12:00" },
        ],
        "2021-10-02": [
          { id: 4, time: "10:00" },
          { id: 5, time: "11:00" },
          { id: 6, time: "12:00" },
        ],
        "2021-10-03": [
          { id: 4, time: "10:00" },
          { id: 5, time: "11:00" },
          { id: 6, time: "12:00" },
        ],
        "2021-10-04": [
          { id: 4, time: "10:00" },
          { id: 5, time: "11:00" },
          { id: 6, time: "12:00" },
        ],
      },
    },
  ];
  const [modalConsultantId, setModalConsultantId] = useState<
    number | undefined
  >(undefined);
  const modalConsultant = consultants.find(
    (consultant) => consultant.id === modalConsultantId,
  );

  return (
    <Layout>
      <Container className="flex flex-col gap-4">
        <Title order={1}>Найдите профессионала:</Title>
        <div className="flex flex-wrap items-start gap-3">
          {consultants?.map((consultant) => (
            <Card
              key={consultant.id}
              shadow="sm"
              padding="lg"
              className="flex max-w-lg flex-col gap-4"
            >
              <img
                src={consultant.image}
                className="max-h-32 max-w-xs object-cover"
              />
              <Title order={3}>{consultant.name}</Title>
              <Text>{consultant.description}</Text>
              <Button
                variant="outline"
                fullWidth
                color="blue"
                onClick={() => setModalConsultantId(consultant.id)}
              >
                Записаться
              </Button>
            </Card>
          ))}
        </div>
        <Modal
          title={`${modalConsultant?.name}, ${modalConsultant?.description}`}
          opened={modalConsultant !== undefined}
          onClose={() => setModalConsultantId(undefined)}
          size="auto"
        >
          <Text>Выберите дату и время:</Text>
          <div className="flex w-fit max-w-lg flex-wrap items-start gap-3">
            {Object.entries(modalConsultant?.timeslots ?? {}).map(
              ([date, timeslots]) => (
                <Card
                  key={date}
                  shadow="sm"
                  padding="lg"
                  className="flex max-w-lg flex-col gap-4"
                >
                  <Title order={3}>{date}</Title>
                  {timeslots.map((timeslot) => (
                    <Button
                      key={timeslot.id}
                      variant="outline"
                      fullWidth
                      color="blue"
                      onClick={() => {}}
                    >
                      {timeslot.time}
                    </Button>
                  ))}
                </Card>
              ),
            )}
          </div>
        </Modal>
      </Container>
    </Layout>
  );
}
