export type SectionProps = {
  title: string;
};

export default function Section({
  title,
  children,
  ...rest
}: React.ComponentProps<"section"> & SectionProps) {
  return (
    <section {...rest}>
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      {children}
    </section>
  );
}
