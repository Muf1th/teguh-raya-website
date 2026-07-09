"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Label, STROKE, DIM, RED, GREEN } from "./ui";

export const TIMING_STEPS = [
  "Behind the timing cover: the old belt is cracked, glazed and stretched — one snap from disaster.",
  "The old belt, tensioner and idler pulleys all come off together.",
  "A new belt is routed precisely around every pulley.",
  "Crankshaft and camshaft timing marks align perfectly.",
  "The engine turns over — every valve and piston in exact sync.",
  "Timing verified.",
];

const BELT = "M400 96 a56 56 0 0 1 54 42 l14 118 a44 44 0 0 1 -22 60 a48 48 0 0 1 -92 0 a44 44 0 0 1 -22 -60 l14 -118 a56 56 0 0 1 54 -42 z";

export default function TimingScene({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const running = step >= 4 && !reduce;

  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Animated timing belt replacement" className="h-auto w-full">
      {/* timing cover, slides open at step 0+ */}
      <motion.g
        initial={false}
        animate={{ x: -260, opacity: 0.35 }}
        transition={{ duration: 1 }}
      >
        <rect x="300" y="70" width="200" height="320" rx="20" fill="#15171C" stroke={DIM} strokeWidth="2" />
        <text x="336" y="240" fill={DIM} fontSize="11" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>TIMING COVER</text>
      </motion.g>

      {/* camshaft pulley (top) */}
      <motion.g style={{ x: 400, y: 150 }}
        animate={running ? { rotate: 360 } : { rotate: step >= 3 ? 0 : -28 }}
        transition={running ? { repeat: Infinity, duration: 2.4, ease: "linear" } : { duration: 1 }}>
        <circle r="54" fill="#15171C" stroke={STROKE} strokeWidth="2.5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i}
            x1={46 * Math.cos((i * 30 * Math.PI) / 180)} y1={46 * Math.sin((i * 30 * Math.PI) / 180)}
            x2={54 * Math.cos((i * 30 * Math.PI) / 180)} y2={54 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke={DIM} strokeWidth="2" />
        ))}
        {/* cam timing mark */}
        <path d="M0 -54 l-7 -12 h14 z" fill={step >= 3 ? GREEN : STROKE} />
      </motion.g>

      {/* crankshaft pulley (bottom) */}
      <motion.g style={{ x: 400, y: 330 }}
        animate={running ? { rotate: 720 } : { rotate: step >= 3 ? 0 : 40 }}
        transition={running ? { repeat: Infinity, duration: 1.2, ease: "linear" } : { duration: 1 }}>
        <circle r="34" fill="#15171C" stroke={STROKE} strokeWidth="2.5" />
        <path d="M0 -34 l-6 -11 h12 z" fill={step >= 3 ? GREEN : STROKE} />
      </motion.g>

      {/* idler + tensioner */}
      <motion.g animate={{ opacity: step === 1 ? 0.15 : 1 }} transition={{ duration: 0.6 }}>
        <circle cx="336" cy="256" r="20" fill="#15171C" stroke={step >= 2 ? GREEN : STROKE} strokeWidth="2" />
        <circle cx="464" cy="256" r="20" fill="#15171C" stroke={step >= 2 ? GREEN : STROKE} strokeWidth="2" />
      </motion.g>

      {/* fixed timing reference marks on the block */}
      <path d="M400 82 l-6 -11 h12 z" fill="none" stroke={GREEN} strokeWidth="1.5" />
      <path d="M400 282 l-6 -11 h12 z" fill="none" stroke={GREEN} strokeWidth="1.5" />

      {/* OLD belt: cracked red, removed step 1 */}
      <motion.path
        d={BELT} fill="none" stroke={RED} strokeWidth="7" strokeDasharray="16 5"
        animate={{ opacity: step >= 1 ? 0 : 1, x: step >= 1 ? -60 : 0, y: step >= 1 ? 50 : 0 }}
        transition={{ duration: 0.9 }}
      />

      {/* NEW belt: draws on at step 2, runs at step 4 */}
      <motion.path
        d={BELT} fill="none" stroke={step >= 4 ? GREEN : STROKE} strokeWidth="7" strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: step >= 2 ? 1 : 0,
          opacity: step >= 2 ? 1 : 0,
          strokeDasharray: running ? "14 8" : "1 0",
          strokeDashoffset: running ? [0, -110] : 0,
        }}
        transition={{
          pathLength: { duration: 1.4, ease: "easeInOut" },
          strokeDashoffset: running ? { repeat: Infinity, duration: 1.6, ease: "linear" } : { duration: 0.3 },
        }}
      />

      {/* alignment confirmation */}
      <motion.g animate={{ opacity: step === 3 ? 1 : 0 }} transition={{ duration: 0.6 }}>
        <line x1="400" y1="70" x2="400" y2="110" stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="400" y1="270" x2="400" y2="308" stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="420" y="76" fill={GREEN} fontSize="11" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>MARKS ALIGNED</text>
      </motion.g>

      <Label x={430} y={118} tx={580} ty={70} text="Camshaft pulley" active={step >= 3} />
      <Label x={428} y={344} tx={580} ty={410} text="Crankshaft" active={step >= 3} />
      <Label x={352} y={210} tx={170} ty={150} text={step >= 2 ? "New belt" : "Cracked belt"} active={step <= 2 || step === 4} />
    </svg>
  );
}
