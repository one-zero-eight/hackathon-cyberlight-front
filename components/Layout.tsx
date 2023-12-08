import Footer from './Footer'
import Header from './Header'
 
export default function Layout({
  children
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
