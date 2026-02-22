"use client";

import { useState } from "react";
import PasswordInput from "@/src/components/shared/UserSettingsInput";
import PasswordButton from "@/src/components/shared/UserSettingsButton";

interface ProfileSettingsFormProps {
  user: any;
  saving: boolean;
  onUpdate: (data: any) => Promise<void>;
}

export default function ProfileSettingsForm({
  user,
  saving,
  onUpdate,
}: ProfileSettingsFormProps) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate({ firstName, lastName, email });
  };

  return (
    <div className="bg-[#13131A] border-[1px] border-[#232328] p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PasswordInput
            type="text"
            text="FIRST NAME"
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <PasswordInput
            type="text"
            text="LAST NAME"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        
        <PasswordInput
          type="email"
          text="EMAIL ADDRESS"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordButton 
          text={saving ? "Saving..." : "Save Changes"} 
          disabled={saving}
        />
      </form>
    </div>
  );
}
