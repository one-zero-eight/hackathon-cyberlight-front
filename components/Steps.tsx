import { useMemo } from "react";
import clsx from "clsx";
import { getThemeColor, useMantineTheme } from "@mantine/core";

export type StepsProps = {
  count: number;
  step?: number;
};

export default function Steps({ count, step = 0 }: StepsProps) {
  const theme = useMantineTheme();

  const steps = useMemo(() => {
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [count]);

  return (
    <div className="flex gap-2">
      {steps.map((i) => (
        <span
          key={i}
          style={
            {
              "--step-color": getThemeColor(theme.primaryColor, theme),
            } as React.CSSProperties
          }
          className={clsx(
            "h-2 basis-full rounded-full",
            i <= step
              ? "bg-[var(--step-color)] dark:bg-[var(--step-color)]"
              : "bg-gray-300 dark:bg-gray-900",
          )}
        ></span>
      ))}
    </div>
  );
}
