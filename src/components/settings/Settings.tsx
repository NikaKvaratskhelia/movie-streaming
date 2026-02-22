"use client";

import { useSettings } from "./useSettings";
import ProfileSettingsForm from "./ProfileSettingsForm";
import PasswordSettingsForm from "./PasswordSettingsForm";
import AccountInfo from "./AccountInfo";

export default function Settings() {
  const {
    user,
    loading,
    saving,
    message,
    handleProfileUpdate,
    handlePasswordUpdate,
  } = useSettings();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {message && <div>{message}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileSettingsForm
          user={user}
          saving={saving}
          onUpdate={handleProfileUpdate}
        />
        
        <PasswordSettingsForm
          saving={saving}
          onUpdate={handlePasswordUpdate}
        />
      </div>
      
      <AccountInfo user={user} />
    </div>
  );
}
