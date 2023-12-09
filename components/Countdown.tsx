import { getDatesDiff } from "@/lib/utils/dates";
import { pluralizeRu } from "@/lib/utils/words";
import { useEffect, useState } from "react";

export type CountdownProps = {
  deadline: Date;
};

export default function Countdown({ deadline }: CountdownProps) {
  const [rendered, setRendered] = useState(false);
  const [diff, setDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
      setDiff(getDatesDiff(new Date(), deadline));
      return;
    }
    const now = new Date();
    const msUntilRefresh = 1000 - now.getMilliseconds();
    const timeout = setTimeout(() => {
      setDiff(getDatesDiff(now, deadline));
    }, msUntilRefresh);
    return () => clearTimeout(timeout);
  }, [deadline, diff, rendered]);

  const hh = diff.hours.toString().padStart(2, "0");
  const mm = diff.minutes.toString().padStart(2, "0");
  const ss = diff.seconds.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-[2px] font-mono text-2xl">
      <span className="rounded-md bg-slate-200 px-2 py-1 dark:bg-slate-700">
        {diff.days}{" "}
        {pluralizeRu({ n: diff.days, one: "день", few: "дня", many: "дней" })}
      </span>
      <span>:</span>
      <span className="rounded-bl-md rounded-tl-md bg-slate-200 px-2 py-1 dark:bg-slate-700">
        {hh.slice(0, 1)}
      </span>
      <span className="rounded-br-md rounded-tr-md bg-slate-200 px-2 py-1 dark:bg-slate-700">
        {hh.slice(1)}
      </span>
      <span>:</span>
      <span className="rounded-bl-md rounded-tl-md bg-slate-200 px-2 py-1 dark:bg-slate-700">
        {mm.slice(0, 1)}
      </span>
      <span className="rounded-br-md rounded-tr-md bg-slate-200 px-2 py-1 dark:bg-slate-700">
        {mm.slice(1)}
      </span>
      <span>:</span>
      <span className="rounded-bl-md rounded-tl-md bg-slate-200 px-2 py-1 dark:bg-slate-700">
        {ss.slice(0, 1)}
      </span>
      <span className="rounded-br-md rounded-tr-md bg-slate-200 px-2 py-1 dark:bg-slate-700">
        {ss.slice(1)}
      </span>
    </div>
  );
}
