"use client";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";

export default function CustomTitleBar() {
  // Always start as false to match SSR, then update on client
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDark(saved === "dark");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  // You need to expose window controls via Electron's preload script for production!
  const handleMinimize = () => window.electronAPI?.minimize?.();
  const handleMaximize = () => window.electronAPI?.maximize?.();
  const handleClose = () => window.electronAPI?.close?.();

  // Debug/dev tools (only show in development)
  const handleReload = () => window.location.reload();
  const handleDevTools = () => window.electronAPI?.openDevTools?.();

  return (
    <div
      className="titlebar flex items-center justify-between w-full h-10 px-4 py-0 select-none"
      style={{
        WebkitAppRegion: "drag",
        background: "transparent",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: "auto",
      } as any}
    >
      <span className="font-bold text-base text-black dark:text-white">
        WIDGETIZE
      </span>
      <div className="flex gap-2" style={{ WebkitAppRegion: "no-drag" } as any}>
        {/* Theme Toggle */}
        <label className="flex items-center cursor-pointer mr-2">
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark((d) => !d)}
            style={{ accentColor: "#888", marginRight: 4 }}
          />
          <span className="text-black dark:text-white" style={{ fontSize: 12 }}>
            {dark ? "🌙" : "☀️"}
          </span>
        </label>
        {/* Debug/Dev Buttons */}
        {process.env.NODE_ENV === "development" && (
          <>
            <button
              onClick={handleReload}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-black dark:text-white text-lg transition-colors"
              aria-label="Reload"
              title="Reload"
            >
              <span style={{ fontSize: "1.2em", lineHeight: 1 }}>⟳</span>
            </button>
            <button
              onClick={handleDevTools}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-black dark:text-white text-lg transition-colors"
              aria-label="DevTools"
              title="Open DevTools"
            >
              <FiSettings size={20} /> {/* Monochrome settings icon */}
            </button>
          </>
        )}
        {/* Window Controls */}
        <button
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-black dark:text-white text-lg transition-colors"
          aria-label="Minimize"
        >
          <span style={{ fontSize: "1.2em", lineHeight: 1 }}>─</span>
        </button>
        <button
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-black dark:text-white text-lg transition-colors"
          aria-label="Maximize"
        >
          <span style={{ fontSize: "1.0em", lineHeight: 1 }}>☐</span>
        </button>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-600 text-black dark:text-white text-lg transition-colors"
          aria-label="Close"
        >
          <span style={{ fontSize: "1.5em", lineHeight: 1 }}>×</span>
        </button>
      </div>
    </div>
  );
}