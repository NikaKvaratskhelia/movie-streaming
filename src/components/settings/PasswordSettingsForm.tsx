"use client";

import { useState } from "react";
import PasswordInput from "@/src/components/shared/UserSettingsInput";
import PasswordButton from "@/src/components/shared/UserSettingsButton";
import { useSettings } from "../../hooks/useSettings";
import { toast } from "sonner";

export default function PasswordSettingsForm({}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { saving, handlePasswordUpdate } = useSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Password fields must match!");
      return;
    }

    handlePasswordUpdate({ oldPass: currentPassword, newPass: newPassword });
  };

  return (
    <div
      className="
        bg-[#13131a]
        border border-[#232328]
        p-5 sm:p-6 lg:p-8
        rounded-xl
        shadow-lg
        w-full
        max-w-150
      "
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <PasswordInput
          type="password"
          text="CURRENT PASSWORD"
          id="currentPassword"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <PasswordInput
          type="password"
          text="NEW PASSWORD"
          id="newPassword"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <PasswordInput
          type="password"
          text="CONFIRM NEW PASSWORD"
          id="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <PasswordButton
          text={saving ? "Updating..." : "Update Password"}
          disabled={saving}
        />
      </form>
    </div>
  );
}
