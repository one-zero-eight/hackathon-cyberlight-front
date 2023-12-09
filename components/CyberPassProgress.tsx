import { useCyberPass } from "@/lib/cyberPass";
import { Progress } from "@mantine/core";
import Link from "next/link";

export default function CyberPassProgress() {
  const { progress, currentLevelValue } = useCyberPass();

  return (
    <Link href="/profile/cyber-pass" className="flex flex-col gap-1">
      <div className="text-center text-sm text-gray-800 dark:text-gray-600">
        Кибер.Пропуск: {currentLevelValue || 0} уровень
      </div>
      <Progress
        color="orange"
        radius="xl"
        value={progress || 0}
        striped
        className="min-w-[200px]"
      />
    </Link>
  );
}
