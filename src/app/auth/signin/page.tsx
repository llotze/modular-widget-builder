"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await signIn("credentials", { email, password, callbackUrl: "/" });
      }}
      className="flex flex-col gap-2 max-w-xs mx-auto mt-20"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2"
      />
      <button type="submit" className="bg-black text-white p-2 rounded">
        Sign in
      </button>
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in with Google
      </button>
      <button
        type="button"
        className="mt-4 text-gray-400 hover:text-gray-700 text-sm transition-colors"
        onClick={() => router.push("/auth/register")}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        Create account
      </button>
    </form>
  );
}