import React from "react";

interface TextProperties {
  text: string;
  color: string;
}

interface PropertiesSidebarProps {
  selectedTool: string | null;
  textProps: TextProperties;
  setTextProps: (props: TextProperties) => void;
}

export default function PropertiesSidebar({
  selectedTool,
  textProps,
  setTextProps,
}: PropertiesSidebarProps) {
  if (!selectedTool) return null;

  return (
    <aside
      className="fixed top-0 right-0 h-full w-66 border-l z-10 mt-18"
      style={{
        background: "var(--color-bg-main)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="p-4 mt-10 font-bold text-lg" style={{ color: "var(--color-text-main)" }}>
        Properties
      </div>
      <div className="p-4 text-[var(--color-text-muted)]">
        {selectedTool === "text" && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-semibold" style={{ color: "var(--color-text-main)" }}>
                Text
              </label>
              <input
                type="text"
                value={textProps.text}
                onChange={e => setTextProps({ ...textProps, text: e.target.value })}
                className="w-full px-2 py-1 rounded border"
                style={{
                  background: "var(--color-bg-section)",
                  color: "var(--color-text-main)",
                  borderColor: "var(--color-border)",
                }}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold" style={{ color: "var(--color-text-main)" }}>
                Text Color
              </label>
              <input
                type="color"
                value={textProps.color}
                onChange={e => setTextProps({ ...textProps, color: e.target.value })}
                className="w-10 h-8 p-0 border-none bg-transparent"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}
        {selectedTool !== "text" && (
          <div className="text-sm">Widget configuration options will appear here.</div>
        )}
      </div>
    </aside>
  );
}