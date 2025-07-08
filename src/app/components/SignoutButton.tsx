"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className=" text-red-500 px-4 py-2 rounded"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
    >
      Sign out
    </button>
  );
}