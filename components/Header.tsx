import Link from "next/link";
import { ActionIcon, Container, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function Header() {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <header className="w-full">
      <Container className="mt-4 flex items-center justify-between rounded-md border border-gray-200 p-4 dark:border-gray-900">
        <div className="flex items-center justify-start">
          <Link href="/" className="text-lg font-bold">
            Кибер.База
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
        </div>
      </Container>
    </header>
  );
}
