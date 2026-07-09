"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Label, STROKE, DIM, RED, GREEN } from "./ui";

export const CLUTCH_STEPS = [
  "A slipping clutch: the engine spins fast, but the wheels get only part of the power.",
  "The gearbox is separated from the engine, exposing the clutch.",
  "The worn clutch plate and pressure plate are removed.",
  "The flywheel is cleaned and a new clutch kit is precisely aligned.",
  "The gearbox is reconnected and every bolt torqued to specification.",
  "Full power transfer restored — smooth, complete engagement.",
];

export default function ClutchScene({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const apart = step >= 1 && step <= 3;
  const spinning = (step === 0 || step === 5) && !reduce;

  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Animated clutch replacement" className="h-auto w-full">
      {/* engine (left) */}
      <g>
        <rect x="90" y="140" width="180" height="180" rx="10" fill="#15171C" stroke={STROKE} strokeWidth="2.5" />
        {[120, 160, 200, 240].map((x) => <line key={x} x1={x} y1="155" x2={x} y2="305" stroke={DIM} strokeWidth="1.5" />)}
      </g>

      {/* input rotation arrow (engine side) */}
      <motion.g style={{ x: 300, y: 230 }}
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={spinning ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0.4 }}>
        <path d="M0 -34 a34 34 0 1 1 -24 10" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
        <path d="M-30 -28 l6 12 l-14 2 z" fill={STROKE} />
      </motion.g>

      {/* flywheel */}
      <motion.g animate={{ x: 0 }}>
        <circle cx="345" cy="230" r="58" fill="#15171C" stroke={step >= 3 ? GREEN : STROKE} strokeWidth="2.5" />
        <circle cx="345" cy="230" r="12" fill="none" stroke={DIM} strokeWidth="2" />
      </motion.g>

      {/* OLD clutch disc + pressure plate (red), removed step 2 */}
      <motion.g
        animate={{
          x: apart ? 24 : 0,
          y: step >= 2 ? 130 : 0,
          opacity: step >= 2 ? 0 : 1,
        }}
        transition={{ duration: 0.9 }}
      >
        <circle cx="415" cy="230" r="46" fill="#23262D" stroke={RED} strokeWidth="2.5" />
        <circle cx="415" cy="230" r="20" fill="none" stroke={RED} strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="465" cy="230" r="40" fill="none" stroke={RED} strokeWidth="2" />
      </motion.g>

      {/* NEW clutch kit, appears step 3 */}
      <motion.g
        initial={false}
        animate={{
          x: step >= 4 ? 0 : 24,
          y: step >= 3 ? 0 : -140,
          opacity: step >= 3 ? 1 : 0,
        }}
        transition={{ duration: 0.9 }}
      >
        <circle cx="415" cy="230" r="46" fill="#23262D" stroke={GREEN} strokeWidth="2.5" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a}
            x1={415 + 24 * Math.cos((a * Math.PI) / 180)} y1={230 + 24 * Math.sin((a * Math.PI) / 180)}
            x2={415 + 42 * Math.cos((a * Math.PI) / 180)} y2={230 + 42 * Math.sin((a * Math.PI) / 180)}
            stroke={GREEN} strokeWidth="1.5" />
        ))}
        <circle cx="465" cy="230" r="40" fill="none" stroke={GREEN} strokeWidth="2" />
      </motion.g>

      {/* gearbox (right) — separates */}
      <motion.g animate={{ x: apart ? 150 : 0 }} transition={{ duration: 0.9, ease: "easeInOut" }}>
        <path d="M505 170 h130 l40 24 v76 l-40 20 h-130 z" fill="#15171C" stroke={STROKE} strokeWidth="2.5" />
        <line x1="505" y1="230" x2="470" y2="230" stroke={STROKE} strokeWidth="6" strokeLinecap="round" />
        {[540, 575, 610].map((x) => <circle key={x} cx={x} cy="230" r="10" fill="none" stroke={DIM} strokeWidth="1.5" />)}
      </motion.g>

      {/* output rotation (wheel side): slow/red when slipping, full/green when fixed */}
      <motion.g style={{ x: 730, y: 230 }}
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={spinning ? { repeat: Infinity, duration: step === 0 ? 3.2 : 1, ease: "linear" } : { duration: 0.4 }}>
        <path d="M0 -30 a30 30 0 1 1 -22 9" fill="none" stroke={step === 0 ? RED : step === 5 ? GREEN : DIM} strokeWidth="3" strokeLinecap="round" />
        <path d="M-27 -25 l6 11 l-13 2 z" fill={step === 0 ? RED : step === 5 ? GREEN : DIM} />
      </motion.g>
      <text x="702" y="290" fill={step === 0 ? RED : step === 5 ? GREEN : DIM} fontSize="11"
        style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>
        {step === 0 ? "SLIP" : step === 5 ? "100%" : "OUT"}
      </text>

      <Label x={415} y={185} tx={430} ty={90} text={step >= 3 ? "New clutch kit" : "Worn clutch"} active={step >= 1 && step <= 4} />
      <Label x={345} y={172} tx={200} ty={90} text="Flywheel" active={step === 3} />
      <Label x={570} y={180} tx={640} ty={110} text="Gearbox" active={step === 1 || step === 4} />
    </svg>
  );
}
