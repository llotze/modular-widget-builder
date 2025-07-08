import { useDragLayer } from "react-dnd";

export default function CustomDragLayer({ textProps }: { textProps: { text: string; color: string } }) {
  const { itemType, isDragging, currentOffset } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || itemType !== "TOOLBOX_ITEM" || !currentOffset) return null;

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: 0,
        height: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: currentOffset.x,
          top: currentOffset.y,
          transform: "translate(-50%, -50%)",
          color: textProps.color,
          fontSize: "2rem",
          fontWeight: 600,
          background: "rgba(255,255,255,0.85)",
          border: "1px solid #aaa",
          borderRadius: 6,
          padding: "8px 16px",
          boxShadow: "0 2px 8px #0002",
        }}
      >
        {textProps.text}
      </div>
    </div>
  );
}