import CyberPassProgress from "@/components/CyberPassProgress";
import { useSignOut } from "@/lib/auth";
import { useUser } from "@/lib/user";
import {
  ActionIcon,
  Button,
  Container,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { loggedIn, user } = useUser();
  const signOut = useSignOut();
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Container component="header" className="w-full">
      <div className="mt-4 flex flex-col items-center justify-between gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-900 lg:flex-row">
        <div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
          <Link href="/" className="text-lg font-bold lg:mr-4">
            Кибер.База
          </Link>
          <Link href="/lessons">
            <Button
              variant={
                router.pathname.startsWith("/lessons") ? "light" : "subtle"
              }
              color={router.pathname.startsWith("/lessons") ? "blue" : "gray"}
            >
              Уроки
            </Button>
          </Link>
          <Link href="/consult">
            <Button
              variant={
                router.pathname.startsWith("/consult") ? "light" : "subtle"
              }
              color={router.pathname.startsWith("/consult") ? "blue" : "gray"}
            >
              Консультации
            </Button>
          </Link>
          <Link href="/feed">
            <Button
              variant={router.pathname.startsWith("/feed") ? "light" : "subtle"}
              color={router.pathname.startsWith("/feed") ? "blue" : "gray"}
            >
              Новости
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CyberPassProgress />
          <ActionIcon
            component="button"
            variant="subtle"
            onClick={toggleColorScheme}
          >
            <IconSun className="hidden dark:block" stroke={1.5} />
            <IconMoon className="dark:hidden" stroke={1.5} />
          </ActionIcon>
          {!loggedIn || user == null ? (
            <Link href="/login">
              <Button
                variant="outline"
                leftSection={<span className="icon-[mdi--login]" />}
              >
                Войти
              </Button>
            </Link>
          ) : (
            <Menu position="bottom-end">
              <Menu.Target>
                <Button
                  variant="outline"
                  rightSection={<span className="icon-[mdi--chevron-down]" />}
                >
                  {user.name || "Аноним"}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Link href="/profile">
                  <Menu.Item
                    leftSection={
                      <span className="icon-[mdi--account-circle]" />
                    }
                  >
                    Профиль
                  </Menu.Item>
                </Link>
                <Link href="/profile/achievements">
                  <Menu.Item
                    leftSection={<span className="icon-[mdi--star]" />}
                  >
                    Достижения
                  </Menu.Item>
                </Link>
                <Link href="/profile/cyber-pass">
                  <Menu.Item
                    leftSection={<span className="icon-[mdi--ticket]" />}
                  >
                    Кибер.Пропуск
                  </Menu.Item>
                </Link>
                {user.role === "admin" && (
                  <>
                    <Menu.Divider />
                    <Link href="/admin">
                      <Menu.Item
                        leftSection={<span className="icon-[mdi--settings]" />}
                      >
                        Админка
                      </Menu.Item>
                    </Link>
                  </>
                )}
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<span className="icon-[mdi--logout]" />}
                  onClick={signOut}
                >
                  Выйти
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>
    </Container>
  );
}
