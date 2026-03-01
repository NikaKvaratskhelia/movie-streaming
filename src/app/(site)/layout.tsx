import Header from "@/src/components/layout/header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}