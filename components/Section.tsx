import clsx from "clsx";

export type SectionProps = {
  title: string;
  level?: 1 | 2 | 3;
};

export default function Section({
  title,
  children,
  level = 1,
  ...rest
}: React.ComponentProps<"section"> & SectionProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <section {...rest}>
      <Component
        className={clsx(
          "mb-4 font-bold",
          level === 1 ? "text-4xl" : level === 2 ? "text-3xl" : "text-2xl",
        )}
      >
        {title}
      </Component>
      {children}
    </section>
  );
}
