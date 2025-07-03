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
    <div className="min-h-screen flex bg-[#1b1b1b]">
      {/* Left: Sign In Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-[#1b1b1b] px-8 py-12 z-10">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#161616] border border-[#232329] rounded-full flex items-center justify-center">
            <FaUser className="text-gray-500 text-2xl" />
          </div>
          <span className="text-gray-100 text-xl font-bold tracking-widest">
            WIDGITIZE
          </span>
        </div>
        {/* Avatar Icon */}
        <div className="w-20 h-20 rounded-full bg-[#1b1b1b] flex items-center justify-center mb-6 border border-[#232329]">
          <FaUser className="text-4xl text-gray-600" />
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
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 pr-3 py-2 rounded bg-[#1b1b1b] text-gray-100 border border-[#232329] hover:bg-[#161616] focus:outline-none focus:border-gray-500 focus:bg-[#161616] w-full transition"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-3 py-2 rounded bg-[#1b1b1b] text-gray-100 border border-[#232329] hover:bg-[#161616] focus:outline-none focus:border-gray-500 focus:bg-[#161616] w-full transition"
            />
          </div>
          <button
            type="submit"
            className="border border-gray-400 text-gray-100 font-semibold py-2 rounded mt-2 transition-colors hover:bg-[#161616] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            style={{
              letterSpacing: "0.05em",
              fontSize: "1rem",
              boxShadow: "0 1px 2px 0 #0000000d",
            }}
          >
            LOGIN
          </button>
        </form>
        {/* Extra options */}
        <div className="flex justify-between w-full mt-3 text-xs text-gray-500">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-gray-600" />
            Remember me
          </label>
          <button
            type="button"
            className="hover:text-gray-300 transition-colors"
            onClick={() => router.push("/auth/forgot")}
          >
            Forgot your password?
          </button>
        </div>
        {/* Divider */}
        <div className="w-full border-t border-[#232329] my-4" />
        {/* Social/Google Sign In */}
        <button
          type="button"
          className="border border-gray-700 text-gray-300 font-semibold py-2 rounded w-full transition-colors hover:bg-[#161616] hover:border-gray-500"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in with Google
        </button>
        {/* Create Account */}
        <button
          type="button"
          className="mt-4 text-gray-500 hover:text-gray-200 text-sm transition-colors"
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
      <div className="hidden md:flex flex-1 flex-col justify-center items-center relative overflow-hidden bg-[#161616]">
        {/* Background PNG with opacity */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/welcomebg.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.18, // Only the image is faded
            pointerEvents: "none", // So it doesn't block clicks
            zIndex: 0,
          }}
        />
        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl font-bold text-gray-100 mb-4">Welcome</h1>
          <p className="text-lg text-gray-400 max-w-md text-center ">
            Build, customize, and manage your widgets locally or in the cloud.
          </p>
        </div>
      </div>
    </div>
  );
}