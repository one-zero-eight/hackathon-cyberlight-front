import Layout from "@/components/Layout";
import { useCyberPass } from "@/lib/cyberPass";
import { Container, Title } from "@mantine/core";
import React, { useMemo } from "react";

export default function Page() {
  const { currentCyberPass, currentLevelValue, progress } = useCyberPass();
  const date_end = useMemo(() => new Date("2023-12-11"), []);
  const [timeLeft, setTimeLeft] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = date_end.getTime() - now.getTime();
      setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [date_end]);

  return (
    <Layout>
      <Container className="block">
        <Title order={1}>Кибер.Пропуск</Title>
        <p>Уровень: {currentLevelValue}</p>
        <p>Прогресс: {progress}</p>
        <p>
          Текущий пропуск: {currentCyberPass?.name} (до {date_end.toISOString()}
          )
        </p>
        <p>
          До конца пропуска: {Math.floor(timeLeft / (1000 * 60 * 60 * 24))}{" "}
          дней, {Math.floor((timeLeft / (1000 * 60 * 60)) % 24)} часов,{" "}
          {Math.floor((timeLeft / (1000 * 60)) % 60)} минут,{" "}
          {Math.floor((timeLeft / 1000) % 60)} секунд
        </p>
        <div>
          <p>Уровни:</p>
          {currentCyberPass?.levels.map((level) => (
            <div key={level.id}>
              <p>
                {level.value} - требуется: {level.experience} xp
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
}
