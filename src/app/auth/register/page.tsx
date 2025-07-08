"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showShimmer, setShowShimmer] = useState(true);
  const router = useRouter();

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  React.useEffect(() => {
    if (!showShimmer) return;
    const timeout = setTimeout(() => setShowShimmer(false), 1500); // match your animation duration
    return () => clearTimeout(timeout);
  }, [showShimmer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
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
    // Automatically sign in after registration and let NextAuth handle redirect
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: "var(--color-bg-main)" }}
    >
      {/* Left: Register Form */}
      <div
        className="
          flex flex-col justify-center items-center
          w-full
          min-w-[300px]
          max-w-full
          md:max-w-md
          px-8 py-12 z-10
          flex-1
        "
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
        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
          noValidate
        >
          <div className="relative">
            <FaUser
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="pl-10 pr-3 py-2 rounded border w-full transition"
              style={{
                color: "var(--color-text-main)",
                borderColor: "var(--color-bg-accent)",
              }}
            />
          </div>
          <div className="relative">
            <FaUser
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Gmail"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              className="pl-10 pr-3 py-2 rounded border w-full transition"
              style={{
                color: "var(--color-text-main)",
                borderColor: emailError ? "#ef4444" : "var(--color-bg-accent)",
              }}
            />
          </div>
          {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
          <div className="relative">
            <FaLock
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              className="pl-10 pr-3 py-2 rounded border w-full transition"
              style={{
                color: "var(--color-text-main)",
                borderColor: passwordError ? "#ef4444" : "var(--color-bg-accent)",
              }}
            />
          </div>
          {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="font-semibold py-2 rounded mt-2 transition-colors"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-main)",
              background: "var(--color-button-base)",
              letterSpacing: "0.05em",
              fontSize: "1rem",
              boxShadow: "0 1px 1px 0 #0000000d",
            }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        {/* Divider */}
        <div
          className="w-full my-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        />
        {/* Social/Google Sign Up */}
        <button
          type="button"
          className="font-semibold py-2 rounded w-full transition-colors"
          style={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            background: "var(--color-button-base)",
            letterSpacing: "0.05em",
            fontSize: "1rem",
            boxShadow: "0 1px 1px 0 #0000000d",
          }}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Register with Google
        </button>
        {/* Already have an account? */}
        <div className="flex items-center gap-1 mt-4 text-sm">
          <div
            style={{
              color: "var(--color-text-muted)",
              userSelect: "none",
            }}
          >
            Already have an account?
          </div>
          <div>
            <span
              className="underline signup-hover"
              style={{
                cursor: "pointer",
                borderRadius: 4,
                padding: "0 2px",
                transition: "background 0.2s",
                display: "inline-block",
                color: "var(--color-text-muted)",
              }}
              onClick={() => router.push("/auth/signin")}
              onMouseOver={e => (e.currentTarget.style.background = "var(--color-bg-accent)")}
              onMouseOut={e => (e.currentTarget.style.background = "none")}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
      {/* Right: Welcome Splash */}
      <div
        className={
          "hidden md:flex flex-1 flex-col justify-center items-center relative overflow-hidden " +
          (showShimmer ? "circuit-bg-shimmer-once" : "")
        }
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