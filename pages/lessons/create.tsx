import Layout from "@/components/Layout";
import { useRequireAdmin } from "@/lib/auth";
import { Button, Container, NumberInput, TextInput } from "@mantine/core";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  useRequireAdmin();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(5);

  const mutation = useMutation<any, DefaultError, any>({
    onSuccess: (data) => {
      router.replace(`/lessons/${data.id}/edit`);
    },
  });

  const handleSave = () => {
    mutation.mutate({
      url: "/lessons/",
      method: "POST",
      body: {
        title: title,
        content: "",
        difficulty: difficulty,
        alias: title.toLowerCase().replace(/\s/g, "-"),
      },
    });
  };

  return (
    <Layout>
      <Container className="flex flex-col gap-2">
        <h1 className="text-2xl">Новый урок</h1>
        <TextInput
          label="Название"
          placeholder="Введите заголовок урока"
          className="w-96"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <NumberInput
          label="Сложность"
          description="Значение от 1 до 10"
          placeholder="5"
          className="w-96"
          value={difficulty}
          onChange={(event) => setDifficulty(Number(event))}
        />

        <div className="w-fit">
          <Button onClick={handleSave}>Продолжить</Button>
        </div>
      </Container>
    </Layout>
  );
}
