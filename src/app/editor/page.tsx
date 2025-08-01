"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ToolboxTopbar from "../components/ToolboxTopbar";
import PropertiesSidebar from "../components/PropertiesSidebar";
import CustomDragLayer from "../components/CustomDragLayer";
import Moveable from "react-moveable";

const TOOLBOX_ITEMS = [
  { type: "text", label: "Text" },
  { type: "clock", label: "Clock" },
  { type: "weather", label: "Weather" },
];

export default function WidgetBuilderCanvas() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [debugOffset, setDebugOffset] = useState({ x: 0, y: 0 });
  const [textProps, setTextProps] = useState({ text: "Sample Text", color: "#222222" });
  const [widgets, setWidgets] = useState<
    { id: string; type: string; x: number; y: number; props: any }[]
  >([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [widgetRects, setWidgetRects] = useState<Record<string, { width: number; height: number }>>({});

  const gridRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const router = useRouter();

  const GRID_SIZE = 10000 + 2 * 40; // Add 2 columns (right) and 2 rows (bottom), each 40px

  // Calculate the visible area (canvas) size
  function getCanvasRect() {
    // These must match the style of the canvas container
    const left = 192; // 12rem
    const right = 256; // 16rem
    const width = window.innerWidth - left - right;
    const height = window.innerHeight;
    return { left, right, width, height };
  }

  // Clamp offset so grid never goes out of bounds
  function clampOffset(offset: { x: number; y: number }, zoomValue = zoom) {
    const { width, height } = getCanvasRect();
    const scaledGridWidth = GRID_SIZE * zoomValue;
    const scaledGridHeight = GRID_SIZE * zoomValue;

    // X axis: minX logic (already implemented)
    const baseZoomX = 0.7;
    const baseMinX = -2908;
    const perStepX = 500;
    const stepsX = Math.round((zoomValue - baseZoomX) / 0.1);
    const minX = baseMinX - perStepX * stepsX;

    // X axis: maxX logic (new, as requested)
    const baseMaxX = 2908;
    const maxX = baseMaxX + perStepX * stepsX;

    // Y axis: minY logic (already implemented)
    const baseZoomY = 0.7;
    const baseMinY = -2998;
    const perStepY = 500;
    const stepsY = Math.round((zoomValue - baseZoomY) / 0.1);
    const minY = baseMinY - perStepY * stepsY;

    // Y axis: maxY logic (new, as requested)
    const baseMaxY = 2996;
    const maxY = baseMaxY + perStepY * stepsY;

    return {
      x: Math.max(minX, Math.min(maxX, offset.x)),
      y: Math.max(minY, Math.min(maxY, offset.y)),
    };
  }

  function centerOffsetForZoom(zoomValue: number) {
    const { width, height } = getCanvasRect();
    const scaledGridWidth = GRID_SIZE * zoomValue;
    const scaledGridHeight = GRID_SIZE * zoomValue;
    // Center the grid if it's smaller than the canvas
    return {
      x: Math.round(Math.max(0, (width - scaledGridWidth) / 2)),
      y: Math.round(Math.max(0, (height - scaledGridHeight) / 2)),
    };
  }

  function onMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    let newOffset = {
      x: offsetRef.current.x + dx,
      y: offsetRef.current.y + dy,
    };
    newOffset = clampOffset(newOffset);
    // Directly update the grid transform for best performance
    if (gridRef.current) {
      gridRef.current.style.transform = `translate(${newOffset.x}px, ${newOffset.y}px) scale(${zoom}) translateZ(0)`;
    }
    setDebugOffset(newOffset); // For debug display only
  }

  function onMouseUp(e: MouseEvent) {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    let newOffset = {
      x: offsetRef.current.x + dx,
      y: offsetRef.current.y + dy,
    };
    newOffset = clampOffset(newOffset);
    offsetRef.current = newOffset;
    setIsDragging(false);
    dragStartRef.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    setDebugOffset(offsetRef.current); // For debug display only
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const prevZoom = zoom;
    // Limit zoom out to 0.7
    let newZoom = Math.max(0.7, Math.min(3, zoom - e.deltaY * 0.001));

    // Calculate the grid's center before zoom
    const { width, height } = getCanvasRect();
    const gridCenterX = width / 2 - offsetRef.current.x;
    const gridCenterY = height / 2 - offsetRef.current.y;
    const relX = gridCenterX / (GRID_SIZE * prevZoom);
    const relY = gridCenterY / (GRID_SIZE * prevZoom);

    // If grid is smaller than canvas after zoom, center it
    const scaledGridWidth = GRID_SIZE * newZoom;
    const scaledGridHeight = GRID_SIZE * newZoom;
    let newOffset;
    if (scaledGridWidth <= width && scaledGridHeight <= height) {
      newOffset = centerOffsetForZoom(newZoom);
    } else {
      // Zoom towards center
      const newGridCenterX = relX * (GRID_SIZE * newZoom);
      const newGridCenterY = relY * (GRID_SIZE * newZoom);
      newOffset = {
        x: width / 2 - newGridCenterX,
        y: height / 2 - newGridCenterY,
      };
      newOffset = clampOffset(newOffset, newZoom);
    }

    setZoom(newZoom);
    offsetRef.current = newOffset;
    // Update transform immediately for smooth zoom
    if (gridRef.current) {
      gridRef.current.style.transform = `translate(${newOffset.x}px, ${newOffset.y}px) scale(${newZoom}) translateZ(0)`;
    }
    setDebugOffset(newOffset); // For debug display only
  }

  // Ensure grid stays clamped on resize
  React.useEffect(() => {
    function handleResize() {
      offsetRef.current = clampOffset(offsetRef.current);
      if (gridRef.current) {
        gridRef.current.style.transform = `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px) scale(${zoom}) translateZ(0)`;
      }
      setDebugOffset(offsetRef.current);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [zoom]);

  // Initial clamp on mount
  React.useEffect(() => {
    offsetRef.current = clampOffset(offsetRef.current);
    if (gridRef.current) {
      gridRef.current.style.transform = `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px) scale(${zoom}) translateZ(0)`;
    }
    setDebugOffset(offsetRef.current);
    // eslint-disable-next-line
  }, []);

  // Drop target for grid
  function GridDropLayer({ children }: { children: React.ReactNode }) {
    const [{ isOver }, drop] = useDrop({
      accept: "TOOLBOX_ITEM",
      drop: (item: { type: string }, monitor) => {
        const offset = monitor.getClientOffset();
        if (!offset || !gridRef.current) return;
        // Calculate grid-relative position
        const gridRect = gridRef.current.getBoundingClientRect();
        const x = (offset.x - gridRect.left - debugOffset.x) / zoom;
        const y = (offset.y - gridRect.top - debugOffset.y) / zoom;
        // Only support text for now
        if (item.type === "text") {
          setWidgets((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).slice(2),
              type: "text",
              x,
              y,
              props: { ...textProps },
            },
          ]);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
    return (
      <div
        ref={(node) => {
          drop(node);
        }}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {children}
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="relative min-h-screen w-full overflow-hidden"
        style={{ background: "var(--color-bg-main)", color: "var(--color-text-main)" }}
      >
        {/* Toolbox Topbar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            zIndex: 20, // very high to guarantee visibility
          }}
        >
          <ToolboxTopbar
            items={TOOLBOX_ITEMS}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            onReturn={() => router.push("/")}
          />
        </div>

        {/* Infinite Grid Canvas */}
        <div
          tabIndex={0}
          className="absolute left-0 right-0 z-0 select-none"
          style={{
            top: "3.5rem", // height of ToolboxTopbar (py-3 + px-6), adjust if needed
            width: "100vw",
            height: "calc(100vh - 3.5rem)",
          }}
        >
          <div
            ref={gridRef}
            className={isDragging ? "cursor-grabbing" : "cursor-grab"}
            style={{
              width: `${GRID_SIZE}px`,
              height: `${GRID_SIZE}px`,
              position: "absolute",
              top: `calc(50% - ${GRID_SIZE / 2}px)`,
              left: `calc(50% - ${GRID_SIZE / 2}px)`,
              transform: `translate(${debugOffset.x}px, ${debugOffset.y}px) scale(${zoom}) translateZ(0)`,
              willChange: "transform",
              backgroundImage: `
                linear-gradient(to right, var(--color-border) 1px, transparent 1px),
                linear-gradient(to bottom, var(--color-border) 1px, transparent 1px),
                linear-gradient(to right, var(--color-grid-major) 2px, transparent 2px),
                linear-gradient(to bottom, var(--color-grid-major) 2px, transparent 2px)
              `,
              backgroundSize: `
                40px 40px,
                40px 40px,
                160px 160px,
                160px 160px
              `,
              backgroundColor: "var(--color-bg-section)",
              transition: "background-color 0.2s",
              pointerEvents: "auto",
              opacity: 1,
              userSelect: "none",
            }}
            onMouseDown={onMouseDown}
            onWheel={onWheel}
          >
            <GridDropLayer>
              {/* Render all dropped widgets */}
              {widgets.map((w) =>
                w.type === "text" ? (
                  <React.Fragment key={w.id}>
                    <span
                      style={{
                        position: "absolute",
                        left: w.x,
                        top: w.y,
                        color: w.props.color,
                        fontSize: "2rem",
                        fontWeight: 600,
                        pointerEvents: "auto",
                        userSelect: "none",
                        transform: "translate(-50%, -50%)",
                        width: widgetRects[w.id]?.width ?? 200,
                        height: widgetRects[w.id]?.height ?? 40,
                        display: "inline-block",
                        background: selectedWidgetId === w.id ? "rgba(0,0,0,0.03)" : undefined,
                        border: selectedWidgetId === w.id ? "1.5px solid #0070f3" : undefined,
                        borderRadius: 4,
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedWidgetId(w.id);
                      }}
                      id={`widget-${w.id}`}
                    >
                      {w.props.text}
                    </span>
                    {selectedWidgetId === w.id && (
                      <Moveable
                        target={document.getElementById(`widget-${w.id}`)}
                        draggable={true}
                        resizable={true}
                        onDrag={({ left, top }) => {
                          setWidgets(ws =>
                            ws.map(widget =>
                              widget.id === w.id ? { ...widget, x: left, y: top } : widget
                            )
                          );
                        }}
                        onResize={({ width, height }) => {
                          setWidgetRects(rects => ({
                            ...rects,
                            [w.id]: { width, height },
                          }));
                        }}
                        keepRatio={false}
                        throttleResize={1}
                        edge={false}
                      />
                    )}
                  </React.Fragment>
                ) : null
              )}
            </GridDropLayer>
          </div>
          {/* Debug info */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 14,
              background: "#000a",
              color: "#fff",
              padding: 8,
              borderRadius: 8,
              fontSize: 12,
              zIndex: 100,
              pointerEvents: "none",
            }}
          >
            <div>
              offset: {`{"x":${Math.round(debugOffset.x)},"y":${Math.round(debugOffset.y)}}`}
            </div>
            <div>zoom: {Math.round(zoom * 10) / 10}</div>
          </div>

          {/* Recenter button */}
          <button
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              zIndex: 101,
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "10px 18px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px #0003",
            }}
            onClick={() => {
              const center = centerOffsetForZoom(zoom);
              offsetRef.current = center;
              if (gridRef.current) {
                gridRef.current.style.transform = `translate(${center.x}px, ${center.y}px) scale(${zoom}) translateZ(0)`;
              }
              setDebugOffset(center);
            }}
          >
            Recenter
          </button>
        </div>

        {/* Properties Sidebar */}
        <PropertiesSidebar
          selectedTool={selectedTool}
          textProps={textProps}
          setTextProps={setTextProps}
        />
        {/* Custom Drag Preview */}
        <CustomDragLayer textProps={textProps} />
      </div>
    </DndProvider>
  );
}