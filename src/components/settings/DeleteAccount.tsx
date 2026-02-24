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
      <div className="flex justify-between items-center border border-[#e05a5a40] rounded-xl p-10 bg-[#13131a]">
        <div className="flex flex-col gap-2 text-white">
          <h2 className="text-[24px] font-medium">Delete profile</h2>
          <p>
            Permanently delete your account and all associated data. This cannot
            be undone.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="py-2.5 px-5 border border-[#e05a5a40] bg-[#E05A5A] rounded-[10px] cursor-pointer text-white font-semibold"
        >
          Delete Account
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-100 flex flex-col justify-center items-center gap-3">
            <h3 className="text-lg font-semibold mb-4">
              Are you absolutely sure?
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              This action cannot be undone.
            </p>

            <input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              className="p-2 rounded-md"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDeletion}
                className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
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
