"use client";

import { useState, useEffect } from "react";
import {
  getCurrentUser,
  updateProfileSettings,
} from "@/src/services/user-service";
import { updatePassword } from "@/src/services/password-service";
import { useAuthStore } from "@/src/store/useLoginStore";

export function useSettings() {
  const { token, hasHydrated, user: globalUser, refreshUser } = useAuthStore();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!hasHydrated || !token) return;

    const fetchUser = async () => {
      const res = await getCurrentUser(token);
      if (res.ok && res.user) {
        setUser(res.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, [token, hasHydrated]);

  const handleProfileUpdate = async (data: any) => {
    if (!token) return;

    setSaving(true);
    const res = await updateProfileSettings(token, data);

    if (res.ok) {
      if (globalUser) {
        refreshUser(token);
      }

      //
    } else {
      setMessage(res.message || "Update failed");
    }

    setSaving(false);
  };

  const handlePasswordUpdate = async (password: string) => {
    if (!token) return;

    setSaving(true);
    const res = await updatePassword(token, password);

    if (res.ok) {
      setMessage("Password updated");
    } else {
      setMessage(res.message || "Password update failed");
    }

    setSaving(false);
  };

  return {
    user,
    loading,
    saving,
    message,
    handleProfileUpdate,
    handlePasswordUpdate,
  };
}
