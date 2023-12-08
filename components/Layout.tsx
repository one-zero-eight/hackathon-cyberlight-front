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
      <main className={clsx("grow", className)}>{children}</main>
      <Footer />
    </div>
  );
}
