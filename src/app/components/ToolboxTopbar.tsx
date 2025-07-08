import React from "react";

export interface ToolboxItem {
  type: string;
  label: string;
}

interface ToolboxTopbarProps {
  items: ToolboxItem[];
  selectedTool: string | null;
  setSelectedTool: (type: string | null) => void;
  onReturn: () => void;
}

export default function ToolboxTopbar({
  items,
  selectedTool,
  setSelectedTool,
  onReturn,
}: ToolboxTopbarProps) {
  return (
    <nav
      className="w-full flex items-center gap-2 px-6 pb-4 pt-12 border-b"
      style={{
        background: "var(--color-bg-main)",
        borderColor: "var(--color-border)",
        zIndex: 20,
      }}
    >
      <span className="font-bold text-lg mr-6" style={{ color: "var(--color-text-main)" }}>
        Toolbox
      </span>
      {items.map((item) => (
        <button
          key={item.type}
          className={`px-4 py-2 rounded transition-colors ${
            selectedTool === item.type
              ? "bg-[var(--color-bg-accent)]"
              : "hover:bg-[var(--color-bg-accent)]"
          }`}
          style={{
            color: "var(--color-text-main)",
            border: selectedTool === item.type ? "2px solid var(--color-border)" : "none",
            fontWeight: selectedTool === item.type ? 600 : 400,
          }}
          onClick={() =>
            selectedTool === item.type
              ? setSelectedTool(null) // Deselect if already selected
              : setSelectedTool(item.type)
          }
        >
          {item.label}
        </button>
      ))}
      <div className="flex-1" />
      <button
        className="ml-auto px-4 py-2 rounded bg-[var(--color-button-base)] text-[var(--color-text-main)] border border-[var(--color-border)] hover:bg-[var(--color-btn-lighten)] transition"
        onClick={onReturn}
      >
        Return to Dashboard
      </button>
    </nav>
  );
}