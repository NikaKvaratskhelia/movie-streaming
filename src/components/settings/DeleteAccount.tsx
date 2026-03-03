"use client";

import { useSettings } from "@/src/hooks/useSettings";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAccount() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { handleDeleteProfile } = useSettings();
  const [pass, setPass] = useState("");
  const router = useRouter();

  async function handleDeletion() {
    handleDeleteProfile(pass);
    router.push("/");
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border border-[#e05a5a40] rounded-xl p-6 sm:p-10 bg-[#13131a]">
        <div className="flex flex-col gap-2 text-white text-center sm:text-left">
          <h2 className="text-[24px] font-medium">Delete profile</h2>
          <p>
            Permanently delete your account and all associated data. This cannot
            be undone.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto py-2.5 px-5 border border-[#e05a5a40] bg-[#E05A5A] rounded-[10px] cursor-pointer text-white font-semibold"
        >
          Delete Account
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md mx-auto flex flex-col justify-center items-center gap-3">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Are you absolutely sure?
            </h3>
            <p className="mb-6 text-sm text-gray-600 text-center">
              This action cannot be undone.
            </p>

            <input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDeletion}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
