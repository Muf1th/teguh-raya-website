"use client";

import { useId, useState } from "react";
import SmartImage from "./SmartImage";

type Props = {
  before: string;
  after: string;
  alt: string;
};

/** Draggable before/after comparison, controlled by an accessible range input. */
export default function BeforeAfter({ before, after, alt }: Props) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[4/3] w-full select-none">
        <SmartImage src={after} alt={`After: ${alt}`} sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <div className="relative h-full" style={{ width: `${10000 / pos}%`, maxWidth: "none" }}>
            <SmartImage src={before} alt={`Before: ${alt}`} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
        <div aria-hidden className="absolute inset-y-0 w-0.5 bg-accent" style={{ left: `${pos}%` }} />
        <span className="absolute left-3 top-3 rounded-md bg-ink/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-md bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
          After
        </span>
      </div>
      <div className="p-4">
        <label htmlFor={id} className="text-xs font-medium text-fog">
          Drag to compare — {alt}
        </label>
        <input
          id={id}
          type="range"
          min={5}
          max={95}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="mt-2 w-full accent-accent"
        />
      </div>
    </div>
  );
}
