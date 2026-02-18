"use client";
import Link from "next/link";

interface ViewAllLinkProps {
  href: string;
  text?: string;
}

export default function ViewAllLink({ href, text = "View All" }: ViewAllLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-gray-400 hover:text-gray-300 transition-colors duration-200 text-[22px] flex items-center gap-2"
    >
      {text}
      <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
}
