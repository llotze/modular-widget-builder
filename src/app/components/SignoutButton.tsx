"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
    >
      Sign out
    </button>
  );
}