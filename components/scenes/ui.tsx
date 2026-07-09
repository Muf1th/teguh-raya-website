"use client";

/** Blueprint-style annotation: dashed leader line + monospace label. */
export function Label({
  x, y, tx, ty, text, active = true,
}: {
  x: number; y: number; tx: number; ty: number; text: string; active?: boolean;
}) {
  return (
    <g opacity={active ? 1 : 0.25} style={{ transition: "opacity .4s" }}>
      <line x1={x} y1={y} x2={tx} y2={ty} stroke="#A7ADB8" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={x} cy={y} r="2.5" fill="#A7ADB8" />
      <text
        x={tx} y={ty - 5}
        fill="#A7ADB8" fontSize="11"
        style={{ fontFamily: "ui-monospace, Menlo, monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}
      >
        {text}
      </text>
    </g>
  );
}

export const STROKE = "#C7CCD6";
export const DIM = "#5A616D";
export const RED = "#EB2129";
export const AMBER = "#F5A623";
export const GREEN = "#34D399";
export const OIL_OLD = "#3A2E1A";
export const OIL_NEW = "#E8B33B";
