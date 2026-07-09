"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Label, STROKE, DIM, RED, GREEN } from "./ui";

export const BRAKE_STEPS = [
  "Worn pads and brake dust — friction material almost gone, stopping power fading.",
  "The caliper is unbolted and lifted; the old pads slide out.",
  "New premium pads slide into position with fresh anti-squeal shims.",
  "The caliper torques back down over the new pads.",
  "The disc spins freely — full, even pad contact restored.",
  "Brake test passed.",
];

export default function BrakeScene({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const spinning = step >= 4 && !reduce;

  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Animated brake service" className="h-auto w-full">
      {/* Disc */}
      <motion.g
        style={{ x: 360, y: 250 }}
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={spinning ? { repeat: Infinity, duration: 2.4, ease: "linear" } : { duration: 0.5 }}
      >
        <circle r="150" fill="#15171C" stroke={STROKE} strokeWidth="2.5" />
        <circle r="52" fill="#0B0C0E" stroke={STROKE} strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={92 * Math.cos((a * Math.PI) / 180)} cy={92 * Math.sin((a * Math.PI) / 180)} r="7" fill="none" stroke={DIM} strokeWidth="1.5" />
        ))}
        {[15, 135, 255].map((a) => (
          <circle key={a} cx={30 * Math.cos((a * Math.PI) / 180)} cy={30 * Math.sin((a * Math.PI) / 180)} r="5" fill="none" stroke={DIM} strokeWidth="1.5" />
        ))}
      </motion.g>

      {/* Brake dust particles (step 0) */}
      {[[240, 340], [270, 380], [450, 360], [480, 330], [300, 395]].map(([x, y], i) => (
        <motion.circle
          key={i} cx={x} cy={y} r="3" fill={RED} opacity="0.7"
          animate={{ opacity: step === 0 ? [0.7, 0.2, 0.7] : 0, y: step === 0 ? [0, 6, 0] : 0 }}
          transition={{ repeat: step === 0 && !reduce ? Infinity : 0, duration: 1.6, delay: i * 0.2 }}
        />
      ))}

      {/* Caliper */}
      <motion.g
        animate={{ y: step === 1 || step === 2 ? -70 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <path d="M270 100 a95 95 0 0 1 180 0 l-24 10 a70 70 0 0 0 -132 0 z"
          fill="#23262D" stroke={STROKE} strokeWidth="2.5" />
        <circle cx="300" cy="88" r="5" fill="none" stroke={DIM} strokeWidth="1.5" />
        <circle cx="420" cy="88" r="5" fill="none" stroke={DIM} strokeWidth="1.5" />
      </motion.g>

      {/* Old worn pads — slide out at step 1 */}
      <motion.g
        animate={{ x: step >= 1 ? 230 : 0, opacity: step >= 2 ? 0 : 1 }}
        transition={{ duration: 0.9 }}
      >
        <path d="M292 118 a75 75 0 0 1 136 0 l-14 6 a58 58 0 0 0 -108 0 z" fill={RED} opacity="0.85" />
      </motion.g>

      {/* New pads — slide in at step 2 */}
      <motion.g
        initial={false}
        animate={{ x: step >= 2 ? 0 : -230, opacity: step >= 2 ? 1 : 0 }}
        transition={{ duration: 0.9 }}
      >
        <path d="M288 114 a78 78 0 0 1 144 0 l-18 9 a58 58 0 0 0 -108 0 z" fill={GREEN} opacity="0.9" />
      </motion.g>

      {/* motion arcs when spinning */}
      <motion.path
        d="M545 250 a185 185 0 0 1 -55 131" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round"
        animate={{ opacity: spinning ? [0, 1, 0] : 0 }}
        transition={{ repeat: spinning ? Infinity : 0, duration: 1.2 }}
      />

      <Label x={360} y={135} tx={600} ty={80} text={step >= 2 ? "New pads" : "Worn pads"} active={step <= 3} />
      <Label x={430} y={95} tx={640} ty={140} text="Caliper" active={step === 1 || step === 3} />
      <Label x={470} y={330} tx={620} ty={400} text="Brake disc" active={step === 0 || step >= 4} />
    </svg>
  );
}
