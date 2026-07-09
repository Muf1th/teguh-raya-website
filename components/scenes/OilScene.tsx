"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Label, STROKE, DIM, RED, GREEN, OIL_OLD, OIL_NEW } from "./ui";

export const OIL_STEPS = [
  "Inside the engine: the oil has turned dark and contaminated after months of heat and driving.",
  "The drain plug opens — every drop of old oil drains out of the sump.",
  "The old oil filter, full of trapped dirt, unscrews and is removed.",
  "A brand-new filter seals into place, ready to catch contaminants.",
  "Fresh golden oil pours in — the exact grade and quantity for this engine.",
  "Oil circulates through every passage, coating the bearings, pistons and camshaft.",
  "The engine runs smooth, quiet and fully protected.",
];

export default function OilScene({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const oilColor = step >= 4 ? OIL_NEW : OIL_OLD;
  const running = step >= 5 && !reduce;
  const oilLevel = step === 0 ? 46 : step < 4 ? 0 : 46; // sump fill height

  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Animated engine oil service" className="h-auto w-full">
      {/* Engine block outline */}
      <g stroke={STROKE} strokeWidth="2" fill="none">
        <path d="M250 90 h300 v60 l30 20 v120 h-360 v-120 l30 -20 z" />
        {/* head cover */}
        <rect x="270" y="60" width="260" height="30" rx="6" />
      </g>

      {/* Cylinders & pistons */}
      {[330, 400, 470].map((cx, i) => (
        <g key={cx}>
          <rect x={cx - 24} y={100} width="48" height="96" fill="none" stroke={DIM} strokeWidth="1.5" />
          <motion.g
            animate={running ? { y: [0, -22, 0] } : { y: i === 1 ? -12 : 0 }}
            transition={running ? { repeat: Infinity, duration: 0.7, delay: i * 0.12, ease: "easeInOut" } : { duration: 0.6 }}
          >
            <rect x={cx - 20} y={150} width="40" height="26" rx="3" fill="#1E2127" stroke={STROKE} strokeWidth="1.5" />
            <line x1={cx} y1={176} x2={cx} y2={214} stroke={STROKE} strokeWidth="3" />
          </motion.g>
        </g>
      ))}
      {/* crank */}
      <motion.g
        style={{ x: 400, y: 232 }}
        animate={running ? { rotate: 360 } : { rotate: 0 }}
        transition={running ? { repeat: Infinity, duration: 1.4, ease: "linear" } : { duration: 0.4 }}
      >
        <circle r="20" fill="none" stroke={STROKE} strokeWidth="2" />
        <line x1="-20" y1="0" x2="20" y2="0" stroke={DIM} strokeWidth="2" />
      </motion.g>

      {/* Sump + oil */}
      <path d="M250 290 h300 l-20 46 h-260 z" fill="none" stroke={STROKE} strokeWidth="2" />
      <motion.rect
        x="262" width="276"
        animate={{ y: 336 - oilLevel, height: oilLevel, fill: oilColor }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        opacity="0.9"
      />
      {/* pouring stream (step 4) */}
      <motion.rect
        x="396" y="40" width="8" rx="4" fill={OIL_NEW}
        animate={{ height: step === 4 ? 250 : 0, opacity: step === 4 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Drain plug + draining oil (step 1) */}
      <motion.rect
        x="392" y="338" width="16" height="12" rx="2" fill="#1E2127" stroke={STROKE}
        animate={{ y: step >= 1 && step < 4 ? 366 : 338, opacity: step >= 4 ? 1 : 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.rect
        x="396" y="350" width="8" rx="4" fill={OIL_OLD}
        animate={{ height: step === 1 ? 70 : 0, opacity: step === 1 ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />

      {/* Oil filter: old out, new in */}
      <motion.g
        animate={{ y: step >= 2 ? 90 : 0, opacity: step >= 2 ? 0 : 1, rotate: step >= 2 ? -35 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ originX: "600px", originY: "250px" }}
      >
        <rect x="575" y="220" width="50" height="62" rx="8" fill="#23262D" stroke={RED} strokeWidth="2" />
        <line x1="580" y1="236" x2="620" y2="236" stroke={DIM} />
      </motion.g>
      <motion.g
        initial={false}
        animate={{ y: step >= 3 ? 0 : 110, opacity: step >= 3 ? 1 : 0, rotate: step >= 3 ? 0 : 40 }}
        transition={{ duration: 0.8 }}
        style={{ originX: "600px", originY: "250px" }}
      >
        <rect x="575" y="220" width="50" height="62" rx="8" fill="#23262D" stroke={GREEN} strokeWidth="2" />
        <line x1="580" y1="236" x2="620" y2="236" stroke={GREEN} strokeDasharray="3 3" />
      </motion.g>
      <line x1="550" y1="250" x2="575" y2="250" stroke={DIM} strokeWidth="2" />

      {/* Oil galleries — light up when circulating */}
      <motion.path
        d="M275 300 v-160 h250 v160"
        fill="none" stroke={OIL_NEW} strokeWidth="3" strokeDasharray="10 8"
        animate={
          step >= 5
            ? { opacity: 1, strokeDashoffset: reduce ? 0 : [0, -180] }
            : { opacity: 0 }
        }
        transition={step >= 5 && !reduce ? { strokeDashoffset: { repeat: Infinity, duration: 2, ease: "linear" }, opacity: { duration: 0.5 } } : { duration: 0.5 }}
      />

      {/* status glow when protected */}
      <motion.rect
        x="240" y="50" width="330" height="300" rx="18" fill="none" stroke={GREEN} strokeWidth="2"
        animate={{ opacity: step === 6 ? 0.7 : 0 }} transition={{ duration: 0.8 }}
      />

      <Label x={410} y={330} tx={470} ty={400} text={step >= 4 ? "Fresh oil" : "Old oil"} active={step !== 1 && step < 5 || step === 4} />
      <Label x={600} y={220} tx={650} ty={160} text="Oil filter" active={step >= 2 && step <= 3} />
      <Label x={400} y={344} tx={300} ty={410} text="Drain plug" active={step === 1} />
      <Label x={330} y={160} tx={150} ty={110} text="Pistons" active={step >= 5} />
    </svg>
  );
}
