import React, { useEffect } from "react";
import clsx from "clsx";
import Layout from "@/components/Layout";
import { Container, Skeleton, Title, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAchievements } from "@/api/hooks/useAchievements";
import { useAccountInfo } from "@/api/hooks/useAccountInfo";
import { AchievementDetailed } from "@/api/types";

type Item =
  | {
      loading: true;
    }
  | {
      loading: false;
      achieved: boolean;
      info: AchievementDetailed;
    };

export default function Page() {
  const { achievementsLoading, achievements, achievementsError } =
    useAchievements();
  const { account, accountLoading, accountError } = useAccountInfo();

  useEffect(() => {
    if (achievementsError) {
      notifications.show({
        color: "red",
        title: "Ошибка: не удалось загрузить достижения",
        message: achievementsError.message,
      });
    }
  }, [achievementsError]);

  useEffect(() => {
    if (accountError) {
      notifications.show({
        color: "red",
        title: "Ошибка: не удалось загрузить профиль",
        message: accountError.message,
      });
    }
  }, [accountError]);

  const isLoading =
    !achievements || !account || accountLoading || achievementsLoading;

  let items: Item[] = [];
  if (isLoading) {
    items = new Array(10).fill(0).map(() => ({ loading: true }));
  } else {
    const itemsMap: Record<number, Item> = {};

    for (const info of achievements) {
      itemsMap[info.achievement.id] = {
        loading: false,
        achieved: account.achievements.some(
          (a) => a.id === info.achievement.id,
        ),
        info,
      };
    }

    items = Object.values(itemsMap);
    // Show achieved items first
    items.sort((a, b) =>
      a.loading ? 1 : b.loading ? -1 : a.achieved ? -1 : b.achieved ? 1 : 0,
    );
  }

  return (
    <Layout>
      <Container>
        <Title order={1}>Достижения</Title>
        <div className="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
          {items.map((item, i) => (
            <div key={item.loading ? i : item.info.achievement.id}>
              <Tooltip
                label={
                  item.loading
                    ? "Загрузка..."
                    : `${item.info.achievement.description} (есть у ${(
                        item.info.percent * 100
                      ).toFixed(0)}% пользователей)`
                }
                multiline
                w={250}
                position="bottom"
                withArrow
              >
                <Skeleton visible={item.loading}>
                  <div>
                    {item.loading ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="h-auto w-full"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAesSURBVHgB7dUBEQAgDAAhtX9ntcb+oAT7fgsAGO0sAGA8oQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEgQOgAECB0AAgQOgAECB0AAoQOAAFCB4AAoQNAgNABIEDoABAgdAAIEDoABAgdAAKEDgABQgeAAKEDQIDQASBA6AAQIHQACBA6AAQIHQAChA4AAUIHgAChA0CA0AEg4AF/1QfkEGihHQAAAABJRU5ErkJggg=="
                        alt="loading..."
                      ></img>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className={clsx(
                          "border-dark-300-200 h-auto w-full overflow-hidden rounded-lg border object-cover drop-shadow-lg",
                          item.achieved ? "" : "blur-sm grayscale",
                        )}
                        src={item.info.achievement.image}
                        alt={
                          item.loading
                            ? "Загрузка..."
                            : item.info.achievement.name
                        }
                      />
                    )}
                    <p className="mt-2 whitespace-nowrap break-words text-center text-sm">
                      {item.loading
                        ? "Загрузка..."
                        : item.info.achievement.name}
                    </p>
                  </div>
                </Skeleton>
              </Tooltip>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
}
