"use client";

import { useState } from "react";
import PasswordInput from "@/src/components/shared/UserSettingsInput";
import PasswordButton from "@/src/components/shared/UserSettingsButton";

interface PasswordSettingsFormProps {
  saving: boolean;
  onUpdate: (password: string) => Promise<void>;
}

export default function PasswordSettingsForm({
  saving,
  onUpdate,
}: PasswordSettingsFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      return;
    }

    await onUpdate(newPassword);
  };

  return (
    <div className="bg-[#13131a] border-[1px] border-[#232328] p-8 rounded-xl shadow-lg w-150">
      <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
