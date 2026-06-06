import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CircuitLines from "@/components/theme/CircuitLines";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CircuitLines />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
