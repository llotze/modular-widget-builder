"use client";
import React from "react";
import { SignOutButton } from "../SignoutButton";

export default function WidgetBuilderPage({ email }: { email: string }) {


  return (
    <div className="relative min-h-screen bg-[var(--color-bg-main)] p-8">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
          Signed in as <b>{email}</b>
        </p>
      </div>

      {/* Widget Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-6
          max-w-5xl
          mx-auto
        "
      >

        {/* Add Widget Card */}
        <div
          className="
            flex items-center justify-center
            aspect-square
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-bg-section)]
            transition-transform
            hover:-translate-y-1
            cursor-pointer
            select-none
            group
          "
        >
          <span
            className="
              text-5xl font-bold
              text-[var(--color-text-muted)]
              transition-transform
              group-hover:scale-110
              "
          >
            +
          </span>
        </div>
      </div>

      {/* Sign Out Button - fixed bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <SignOutButton />
      </div>
    </div>
  );
}