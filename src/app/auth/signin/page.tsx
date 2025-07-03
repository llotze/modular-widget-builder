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
    <div className="min-h-screen flex bg-gradient-to-br from-[#2a2156] to-[#1a1440]">
      {/* Left: Sign In Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-[#221a47] px-8 py-12 shadow-lg z-10">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-[#7f5af0] to-[#2cb67d] rounded-full flex items-center justify-center">
            <FaUser className="text-white text-2xl" />
          </div>
          <span className="text-white text-xl font-bold tracking-widest">
            TEMPLATE DSGN
          </span>
        </div>
        {/* Avatar Icon */}
        <div className="w-20 h-20 rounded-full bg-[#2a2156] flex items-center justify-center mb-6">
          <FaUser className="text-4xl text-[#7f5af0]" />
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
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 pr-3 py-2 rounded bg-[#1a1440] text-white border border-[#2a2156] focus:outline-none focus:border-[#7f5af0] w-full"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-3 py-2 rounded bg-[#1a1440] text-white border border-[#2a2156] focus:outline-none focus:border-[#7f5af0] w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-[#ff1cf7] hover:bg-[#e600e6] text-white font-bold py-2 rounded mt-2 transition-colors"
          >
            LOGIN
          </button>
        </form>
        {/* Extra options */}
        <div className="flex justify-between w-full mt-3 text-xs text-gray-400">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-[#7f5af0]" />
            Remember me
          </label>
          <button
            type="button"
            className="hover:text-white transition-colors"
            onClick={() => router.push("/auth/forgot")}
          >
            Forgot your password?
          </button>
        </div>
        {/* Divider */}
        <div className="w-full border-t border-[#2a2156] my-4" />
        {/* Social/Google Sign In */}
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded w-full transition-colors"
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
      <div className="hidden md:flex flex-1 flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="100%">
            <defs>
              <radialGradient id="swirl" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#7f5af0" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#2cb67d" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1a1440" stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#swirl)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome.</h1>
          <p className="text-lg text-gray-300 max-w-md text-center mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet.
          </p>
        </div>
      </div>
    </div>
  );
}