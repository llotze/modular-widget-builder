"use client";
export default function CustomTitleBar() {
  // You need to expose window controls via Electron's preload script for production!
  const handleMinimize = () => window.electronAPI?.minimize?.();
  const handleMaximize = () => window.electronAPI?.maximize?.();
  const handleClose = () => window.electronAPI?.close?.();

  // Debug/dev tools (only show in development)
  const handleReload = () => window.location.reload();
  const handleDevTools = () => window.electronAPI?.openDevTools?.();

  return (
    <div
      className="flex items-center justify-between w-full h-10 px-4 py-0 select-none"
      style={{
        WebkitAppRegion: "drag",
        background: "transparent",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: "auto",
      }}
    >
      <span className="font-bold text-white text-base">WIDGETIZE</span>
      <div className="flex gap-2" style={{ WebkitAppRegion: "no-drag" }}>
        {/* Debug/Dev Buttons */}
        {process.env.NODE_ENV === "development" && (
          <>
            <button
              onClick={handleReload}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-white text-lg transition-colors"
              aria-label="Reload"
              title="Reload"
            >
              <span style={{ fontSize: "1.2em", lineHeight: 1 }}>⟳</span>
            </button>
            <button
              onClick={handleDevTools}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-white text-lg transition-colors"
              aria-label="DevTools"
              title="Open DevTools"
            >
              <span style={{ fontSize: "1.2em", lineHeight: 1 }}>⚙️</span>
            </button>
          </>
        )}
        {/* Window Controls */}
        <button
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-white text-lg transition-colors"
          aria-label="Minimize"
        >
          <span style={{ fontSize: "1.2em", lineHeight: 1 }}>─</span>
        </button>
        <button
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-white text-lg transition-colors"
          aria-label="Maximize"
        >
          <span style={{ fontSize: "1.0em", lineHeight: 1 }}>☐</span>
        </button>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-600 text-white text-lg transition-colors"
          aria-label="Close"
        >
          <span style={{ fontSize: "1.5em", lineHeight: 1 }}>×</span>
        </button>
      </div>
    </div>
  );
}