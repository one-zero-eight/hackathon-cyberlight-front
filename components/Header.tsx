import Link from "next/link";
import {
  ActionIcon,
  Button,
  Container,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useSignOut } from "@/lib/auth";
import { useUser } from "@/lib/user";

export default function Header() {
  const { loggedIn, user } = useUser();
  const signOut = useSignOut();
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Container component="header" className="w-full">
      <div className="mt-4 flex items-center justify-between rounded-md border border-gray-200 p-4 dark:border-gray-900">
        <div className="flex items-center justify-start">
          <Link href="/" className="mr-6 text-lg font-bold">
            Кибер.База
          </Link>
          <Link href="/lessons">
            <Button variant="subtle" color="gray">
              Уроки
            </Button>
          </Link>
          <Link href="/feed">
            <Button variant="subtle" color="gray">
              Новости
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-end">
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
                className="ml-4"
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
                  className="ml-4"
                  variant="outline"
                  rightSection={<span className="icon-[mdi--chevron-down]" />}
                >
                  {user.name}
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
