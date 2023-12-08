import Footer from "./Footer";
import Header from "./Header";

export type LayoutProps = {};

export default function Layout({
  children,
}: React.PropsWithChildren<LayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
