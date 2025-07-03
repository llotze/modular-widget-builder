"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-[#18181b]">
      {/* Left: Sign In Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-[#232329] px-8 py-12 shadow-2xl z-10">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#a1a1aa] rounded-full flex items-center justify-center">
            <FaUser className="text-white text-2xl" />
          </div>
          <span className="text-gray-100 text-xl font-bold tracking-widest">
            WIDGETIFY
          </span>
        </div>
        {/* Avatar Icon */}
        <div className="w-20 h-20 rounded-full bg-[#18181b] flex items-center justify-center mb-6 border border-[#27272a]">
          <FaUser className="text-4xl text-[#6366f1]" />
        </div>
        {/* Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await signIn("credentials", { email, password, callbackUrl: "/" });
          }}
          className="flex flex-col gap-4 w-full"
        >
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 pr-3 py-2 rounded bg-[#18181b] text-gray-100 border border-[#27272a] focus:outline-none focus:border-[#6366f1] w-full transition"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-3 py-2 rounded bg-[#18181b] text-gray-100 border border-[#27272a] focus:outline-none focus:border-[#6366f1] w-full transition"
            />
          </div>
          <button
            type="submit"
            className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-2 rounded mt-2 transition-colors"
          >
            LOGIN
          </button>
        </form>
        {/* Extra options */}
        <div className="flex justify-between w-full mt-3 text-xs text-gray-400">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-[#6366f1]" />
            Remember me
          </label>
          <button
            type="button"
            className="hover:text-gray-200 transition-colors"
            onClick={() => router.push("/auth/forgot")}
          >
            Forgot your password?
          </button>
        </div>
        {/* Divider */}
        <div className="w-full border-t border-[#27272a] my-4" />
        {/* Social/Google Sign In */}
        <button
          type="button"
          className="bg-[#27272a] hover:bg-[#32323a] text-gray-100 font-bold py-2 rounded w-full transition-colors border border-[#32323a]"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in with Google
        </button>
        {/* Create Account */}
        <button
          type="button"
          className="mt-4 text-gray-400 hover:text-gray-200 text-sm transition-colors"
          onClick={() => router.push("/auth/register")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          Not a member?{" "}
          <span className="underline" style={{ cursor: "pointer" }}>
            Sign up now
          </span>
        </button>
      </div>
      {/* Right: Welcome Splash */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center relative overflow-hidden bg-[#18181b]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#swirl)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl font-bold text-gray-100 mb-4">Welcome.</h1>
          <p className="text-lg text-gray-400 max-w-md text-center mb-8">
            Build, customize, and manage your widgets locally or in the cloud. No
            account required!
          </p>
        </div>
      </div>
    </div>
  );
}