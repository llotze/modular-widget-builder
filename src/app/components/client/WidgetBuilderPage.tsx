"use client";
import React, { useState } from "react";
import { SignOutButton } from "../SignoutButton";

export default function WidgetBuilderPage({ email }: { email: string }) {
  const [text, setText] = useState("Hello, Widget!");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#222222");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-[var(--color-bg-main)]">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold" style={{ color: "var(--color-text-main)" }}>
          Modular Widget Builder
        </h1>
        <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
          Signed in as <b>{email}</b>
        </p>
        <SignOutButton />
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl">
        {/* Controls */}
        <div className="flex flex-col gap-4 w-full md:w-1/2 bg-[var(--color-bg-section)] p-6 rounded shadow">
          <label className="font-semibold" style={{ color: "var(--color-text-main)" }}>
            Text
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full mt-1 p-2 rounded border"
              style={{ color: "var(--color-text-main)", background: "var(--color-bg-main)" }}
            />
          </label>
          <label className="font-semibold" style={{ color: "var(--color-text-main)" }}>
            Font Size
            <input
              type="number"
              min={12}
              max={72}
              value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              className="w-full mt-1 p-2 rounded border"
              style={{ color: "var(--color-text-main)", background: "var(--color-bg-main)" }}
            />
          </label>
          <label className="font-semibold" style={{ color: "var(--color-text-main)" }}>
            Color
            <input
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
              className="w-12 h-8 mt-1 p-1 rounded border"
              style={{ background: "var(--color-bg-main)" }}
            />
          </label>
        </div>
        {/* Preview */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-[var(--color-bg-section)] p-6 rounded shadow">
          <span
            style={{
              fontSize: `${fontSize}px`,
              color,
              fontFamily: "inherit",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}