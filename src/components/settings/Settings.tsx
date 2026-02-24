import ProfileSettingsForm from "./ProfileSettingsForm";
import PasswordSettingsForm from "./PasswordSettingsForm";
import AccountInfo from "./AccountInfo";
import AccountOverview from "./AccountOverview";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-[32px] text-white">Profile & Settings</h1>
        <p className="text-[#6b6880] text-[14px] mt-2">
          Manage your account details and preferences.
        </p>
      </div>

      <AccountOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileSettingsForm />

        <PasswordSettingsForm />
      </div>

      <AccountInfo />
      <DeleteAccount />
    </div>
  );
}
