export function getDatesDiff(
  a: Date,
  b: Date,
): {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
} {
  const timeA = a.getTime();
  const timeB = b.getTime();
  const diff = timeB - timeA;

  if (diff < 0) {
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    };
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return {
    seconds,
    minutes,
    hours,
    days,
  };
}
