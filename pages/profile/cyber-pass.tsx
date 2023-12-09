import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Countdown from "@/components/Countdown";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { CyberPassReward, useCyberPass } from "@/lib/cyberPass";
import { Card, Container, Divider, Loader } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { notifications } from "@mantine/notifications";

export default function Page() {
  const {
    cyberPassError,
    cyberPassLoading,
    currentCyberPass,
    currentLevelProgress,
    currentLevelIdx,
  } = useCyberPass();
  const [embla, setEmbla] = useState<Embla | null>(null);

  useEffect(() => {
    if (embla && currentLevelIdx !== undefined) {
      embla.scrollTo(currentLevelIdx);
    }
  }, [embla, currentLevelIdx]);

  useEffect(() => {
    if (cyberPassError) {
      notifications.show({
        color: "red",
        title: "Ошибка: не удалось загрузить Кибер.Пропуск",
        message: cyberPassError.message,
      });
    }
  }, [cyberPassError]);

  const present = Boolean(!cyberPassLoading && currentCyberPass);

  return (
    <Layout>
      <Container>
        <Section
          title={
            currentCyberPass
              ? `Кибер.Пропуск — ${currentCyberPass.name}`
              : "Кибер.Пропуск загружается..."
          }
        >
          {(cyberPassLoading || !currentCyberPass) && (
            <div className="mt-8 flex items-center justify-center">
              <Loader size="xl" />
            </div>
          )}

          {present && <Divider mb={16} />}

          {currentCyberPass && (
            <div className="flex items-center gap-2 text-3xl font-medium">
              <h3>До конца:</h3>
              <Countdown deadline={new Date(currentCyberPass?.date_end)} />
            </div>
          )}

          {currentCyberPass && (
            <div className="mt-8">
              <Carousel
                slideSize="33.33%"
                slideGap={12}
                slidesToScroll={1}
                initialSlide={currentLevelIdx}
                align="center"
                getEmblaApi={setEmbla}
              >
                {currentCyberPass.levels.map((lvl, i) => (
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
                      rewards={lvl.rewards}
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
          )}
        </Section>
      </Container>
    </Layout>
  );
}

export type LevelProps = {
  order: number;
  progress: number;
  current?: boolean;
  rewards: CyberPassReward[];
};

function Level({ order, progress, current, rewards }: LevelProps) {
  const finished = progress >= 1;

  return (
    <div
      className={clsx(
        "relative min-h-[200px] overflow-hidden rounded-md border px-4 pb-[36px] pt-2",
        finished
          ? "border-blue-600 dark:border-blue-800"
          : "border-gray-300 dark:border-gray-800",
      )}
    >
      <h3 className="mb-4 text-center text-xl font-medium">Уровень {order}</h3>
      <div className="flex flex-col">
        {rewards.length === 0 && (
          <span className="text-center text-gray-600 dark:text-gray-800">
            Без наград
          </span>
        )}
        {rewards.map((reward) => (
          <div key={reward.id} className="flex">
            <span className="icon-[mdi--creation-outline] mr-3 mt-1 text-lg text-yellow-700"></span>
            <span>{reward.name}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[24px] w-full bg-gray-200 dark:bg-gray-900">
        <div
          className={clsx(
            "h-full bg-blue-600 dark:bg-blue-800",
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
    </div>
  );
}
