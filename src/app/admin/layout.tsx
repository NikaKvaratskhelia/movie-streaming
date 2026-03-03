import Aside from "@/src/components/admin/Aside";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0e1114] text-white">
      <div className="flex justify-start">
        <Aside />

        <main className="min-w-0 flex-1">
          <div className="w-full max-w-7xl p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
