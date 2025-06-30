"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to create account");
      return;
    }
    // Automatically sign in after registration
    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (signInRes?.ok) {
      router.push("/");
    } else {
      setError("Account created, but failed to sign in. Please try logging in.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs mx-auto mt-20">
      <input
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2"
      />
      <input
        type="email"
        placeholder="Gmail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="border p-2"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-black text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}