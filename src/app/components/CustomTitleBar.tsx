"use client";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Dummy implementations for demonstration. Replace with your real API calls.
async function fetchThemeFromCloud() {
  return localStorage.getItem("theme") || "dark";
}

async function updateThemeOnCloud(newTheme: "light" | "dark") {
  // Simulate saving to cloud
  localStorage.setItem("theme", newTheme);
  return newTheme;
}

export default function CustomTitleBar() {
  // You need to expose window controls via Electron's preload script for production!
  const handleMinimize = () => window.electronAPI?.minimize?.();
  const handleMaximize = () => window.electronAPI?.maximize?.();
  const handleClose = () => window.electronAPI?.close?.();

  // Debug/dev tools (only show in development)
  const handleReload = () => window.location.reload();
  const handleDevTools = () => window.electronAPI?.openDevTools?.();

  // React Query for theme
  const queryClient = useQueryClient();
  const { data: theme = "dark", isLoading } = useQuery({
    queryKey: ["theme"],
    queryFn: fetchThemeFromCloud,
    initialData: "dark",
  });

  const mutation = useMutation({
    mutationFn: updateThemeOnCloud,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["theme"] }),
  });

  // When toggling theme:
  const handleThemeToggle = () => {
    mutation.mutate(theme === "dark" ? "light" : "dark");
  };

  // Set the dark class on <html> when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

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
        <button
          onClick={handleThemeToggle}
          aria-label="Toggle dark mode"
          className="relative w-10 h-6 rounded-full transition-colors mt-1 duration-200 focus:outline-none"
          style={{
            background: theme === "dark" ? "#232329" : "#e0e0e0",
            border: "1px solid #bdbdbd",
            minWidth: 40,
            minHeight: 24,
            padding: 0,
          }}
        >
          <span
            className="absolute left-0 top-0 h-full flex items-center pl-1 text-xs transition-colors"
            style={{
              color: theme === "dark" ? "#fff" : "#000",
              opacity: theme === "dark" ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            ☀️
          </span>
          <span
            className="absolute right-0 top-0 h-full flex items-center pr-1 text-xs transition-colors"
            style={{
              color: theme === "dark" ? "#fff" : "#000",
              opacity: theme === "dark" ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          >
            🌙
          </span>
          <span
            className="absolute top-1/2 left-1 transition-transform duration-200"
            style={{
              transform: `translateY(-50%) translateX(${theme === "dark" ? "12px" : "0px"})`,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: theme === "dark" ? "#fff" : "#000",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              border: "1px solid #bdbdbd",
              display: "block",
            }}
          />
        </button>
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