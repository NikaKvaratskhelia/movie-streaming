import CardsLayout from "@/src/components/admin/CardsLayout";
import UsersTable from "@/src/components/admin/UsersTable";

export default function AdminDashboard() {
  return (
    <div className="text-white max-w-300 mx-auto">
      <CardsLayout />
      <UsersTable />
    </div>
  );
}
