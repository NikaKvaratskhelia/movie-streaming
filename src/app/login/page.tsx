import LogInModul from "@/src/components/login/Login-modul";

export default function page() {
  return (
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,#1a1a2e,#0f0f1a,#000000)] flex justify-center items-center">
      <LogInModul />;
    </div>
  );
}
