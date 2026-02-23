export default function EditProfileButton() {
  return (
    <button className="bg-[#E7C87E] text-black px-4 py-2 rounded-[10px] text-sm font-medium flex items-center space-x-2 hover:bg-[#d4b56d] transition-colors cursor-pointer">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
      <span>Edit Profile</span>
    </button>
  );
}
