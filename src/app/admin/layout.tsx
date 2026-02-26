import { AdminHeader } from "@/src/components/admin/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}
