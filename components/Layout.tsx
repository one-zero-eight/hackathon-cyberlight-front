import clsx from "clsx";
import Footer from "./Footer";
import Header from "./Header";

export type LayoutProps = {
  className?: string;
};

export default function Layout({
  children,
  className,
}: React.PropsWithChildren<LayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={clsx("grow pt-4", className, "px-4 lg:px-0")}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
