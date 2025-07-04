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
    <div
      className="min-h-screen flex"
      style={{ background: "var(--color-bg-main)" }}
    >
      {/* Left: Sign In Form */}
      <div
        className="flex flex-col justify-center items-center w-full max-w-md px-8 py-12 z-10"
        style={{
          background: "var(--color-bg-main)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        {/* Logo and Title */}
        <div className="flex items-center gap-2 mb-8">
          <div
            className="w-10 h-10 border rounded-full flex items-center justify-center"
            style={{
              background: "var(--color-bg-section)",
              borderColor: "var(--color-bg-accent)",
            }}
          >
            <FaUser className="text-2xl" style={{ color: "var(--color-text-muted)" }} />
          </div>
          <span
            className="text-xl font-bold tracking-widest"
            style={{ color: "var(--color-text-main)" }}
          >
            WIDGETIZE
          </span>
        </div>
        {/* Avatar Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 border"
          style={{
            background: "var(--color-bg-main)",
            borderColor: "var(--color-bg-accent)",
          }}
        >
          <FaUser className="text-4xl" style={{ color: "var(--color-text-muted)" }} />
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
            <FaUser
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 pr-3 py-2 rounded border w-full transition"
              style={{
                color: "var(--color-text-main)",
                borderColor: "var(--color-bg-accent)",
              }}
            />
          </div>
          <div className="relative">
            <FaLock
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-3 py-2 rounded border w-full transition"
              style={{
                color: "var(--color-text-main)",
                borderColor: "var(--color-bg-accent)",
              }}
            />
          </div>
          <button
            type="submit"
            className="font-semibold py-2 rounded mt-2 transition-colors"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-main)",
              background: "var(--color-bg-section)",
              letterSpacing: "0.05em",
              fontSize: "1rem",
              boxShadow: "0 1px 2px 0 #0000000d",
            }}
          >
            LOGIN
          </button>
        </form>
        {/* Extra options */}
        <div className="flex justify-between w-full mt-3 text-xs"
          style={{ color: "var(--color-text-muted)" }}>
          <label className="flex items-center gap-1">
            <input type="checkbox" style={{ accentColor: "var(--color-bg-accent)" }} />
            Remember me
          </label>
          <button
            type="button"
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onClick={() => router.push("/auth/forgot")}
          >
            Forgot your password?
          </button>
        </div>
        {/* Divider */}
        <div
          className="w-full my-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        />
        {/* Social/Google Sign In */}
        <button
          type="button"
          className="font-semibold py-2 rounded w-full transition-colors"
          style={{
            border: "1px solid var(--color-bg-accent)",
            color: "var(--color-text-muted)",
            background: "var(--color-bg-section)",
          }}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in with Google
        </button>
        {/* Create Account */}
        <button
          type="button"
          className="mt-4 text-sm transition-colors"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "var(--color-text-muted)",
          }}
          onClick={() => router.push("/auth/register")}
        >
          Not a member?{" "}
          <span
            className="underline transition-colors"
            style={{ cursor: "pointer", borderRadius: 4, padding: "0 2px" }}
            onMouseOver={e => (e.currentTarget.style.background = "var(--color-bg-accent)")}
            onMouseOut={e => (e.currentTarget.style.background = "none")}
          >
            Sign up now
          </span>
        </button>
      </div>
      {/* Right: Welcome Splash */}
      <div
        className="hidden md:flex flex-1 flex-col justify-center items-center relative overflow-hidden"
        style={{ background: "var(--color-bg-section)" }}
      >
        {/* Background PNG with opacity */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/welcomebg.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--color-text-main)" }}>
            Welcome
          </h1>
          <p className="text-lg max-w-md text-center" style={{ color: "var(--color-text-muted)" }}>
            Build, customize, and manage your widgets locally or in the cloud.
          </p>
        </div>
      </div>
    </div>
  );
}