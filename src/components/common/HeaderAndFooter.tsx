import Header from "./Header";
import Footer from "./Footer";

export default function HeaderAndFooter({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
