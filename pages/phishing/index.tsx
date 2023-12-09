import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { Button, Card, Container, Text, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Page() {
  const mutation = useMutation<any, any, any>({});
  const mutation2 = useMutation<any, any, any>({});
  const [textAnswer, setTextAnswer] = useState<string>("");

  const start = () => {
    mutation.mutate({
      url: "/start-phishing-task/",
      method: "GET",
    });
  };

  const submit = () => {
    mutation2.mutate({
      url: "/finish-phishing/?phishing_url=" + encodeURIComponent(textAnswer),
      method: "GET",
    });
  };

  return (
    <Layout>
      <Container>
        <Section title="Фишинг" className="flex flex-col gap-2">
          <Text>
            В течение часа вы будете получать письма с подозрительными ссылками.
            <br />
            Ваша задача - найти подозрительные письма и сообщить нам об этом.
            <br />
            Требуется ввести подозрительную ссылку в окно репорта.
          </Text>
          <Card className="max-w-lg italic" shadow="lg">
            Это задание фокусируется на определении фишинговых писем, которые
            часто содержат подозрительные ссылки, неожиданные вложения или
            странное содержание. Понимание этих признаков помогает предотвратить
            потенциальные угрозы кибербезопасности.
          </Card>
          <div>
            {mutation.isSuccess ? (
              <Text>Задание началось, проверяйте почту!</Text>
            ) : (
              <Button onClick={start} loading={mutation.isPending}>
                Начать
              </Button>
            )}
          </div>
          <div className="flex max-w-lg flex-col gap-2">
            <TextInput
              label="Ответ"
              description="Скопируйте и вставьте сюда найденную фишинговую ссылку"
              placeholder="URL"
              value={textAnswer}
              onChange={(event) => setTextAnswer(event.currentTarget.value)}
            />
            <Button onClick={submit} disabled={textAnswer.length === 0}>
              Отправить
            </Button>
          </div>
        </Section>
      </Container>
    </Layout>
  );
}
