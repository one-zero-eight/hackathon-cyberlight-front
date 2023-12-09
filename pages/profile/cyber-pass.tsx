import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Countdown from "@/components/Countdown";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { useCyberPass } from "@/lib/cyberPass";
import { Card, Container } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";

export default function Page() {
  const {
    currentCyberPass,
    currentLevel,
    currentLevelProgress,
    currentLevelIdx,
  } = useCyberPass();
  const [embla, setEmbla] = useState<Embla | null>(null);

  useEffect(() => {
    if (embla && currentLevelIdx !== undefined) {
      embla.scrollTo(currentLevelIdx);
    }
  }, [embla, currentLevelIdx]);

  return (
    <Layout>
      <Container>
        <Section title={`Кибер.Пропуск — ${currentCyberPass?.name ?? "..."}`}>
          <div className="flex items-center gap-2 text-3xl font-medium">
            <h3>До конца осталось:</h3>
            {currentCyberPass?.date_end ? (
              <Countdown deadline={new Date(currentCyberPass?.date_end)} />
            ) : null}
          </div>

          <div className="mt-8">
            <Carousel
              slideSize="25%"
              slideGap={12}
              slidesToScroll={1}
              initialSlide={currentLevelIdx}
              align="center"
              getEmblaApi={setEmbla}
            >
              {currentCyberPass?.levels.map((lvl, i) => (
                <Carousel.Slide key={lvl.id}>
                  <Level
                    order={lvl.value}
                    progress={
                      i < currentLevelIdx
                        ? 1
                        : i > currentLevelIdx
                          ? 0
                          : currentLevelProgress
                    }
                    current={i === currentLevelIdx}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </Section>
      </Container>
    </Layout>
  );
}

export type LevelProps = {
  order: number;
  progress: number;
  current?: boolean;
};

function Level({ order, progress, current }: LevelProps) {
  return (
    <Card p={0} shadow="sm" withBorder>
      <h3 className="mb-4 text-center text-xl font-medium">Уровень {order}</h3>
      <div className="h-[24px] w-full">
        <div
          className={clsx(
            "h-full bg-emerald-400",
            current
              ? "w-[calc(max(var(--progress),8px))]"
              : "w-[var(--progress)]",
          )}
          style={
            {
              "--progress": `${progress * 100}%`,
            } as React.CSSProperties
          }
        ></div>
      </div>
    </Card>
  );
}
