"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Label, STROKE, DIM, RED, GREEN } from "./ui";

export const MOUNT_STEPS = [
  "Cracked engine mounts: the engine shakes freely, and every vibration reaches the cabin.",
  "The collapsed mount is unbolted and removed.",
  "A new rubber-and-steel mount is fitted and torqued down.",
  "The engine settles level — vibration absorbed before it reaches you.",
  "Idle test passed.",
];

export default function MountScene({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const shaking = step === 0 && !reduce;

  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Animated engine mount replacement" className="h-auto w-full">
      {/* subframe */}
      <line x1="140" y1="360" x2="660" y2="360" stroke={STROKE} strokeWidth="3" />
      <line x1="140" y1="374" x2="660" y2="374" stroke={DIM} strokeWidth="1.5" />

      {/* engine block */}
      <motion.g
        animate={shaking ? { x: [0, -6, 5, -4, 6, 0], rotate: [0, -1.2, 1, 0] } : { x: 0, rotate: 0, y: step >= 3 ? 0 : -4 }}
        transition={shaking ? { repeat: Infinity, duration: 0.55 } : { duration: 0.8 }}
        style={{ originX: "400px", originY: "250px" }}
      >
        <path d="M290 140 h220 v40 l26 18 v90 h-272 v-90 l26 -18 z" fill="#15171C" stroke={STROKE} strokeWidth="2.5" />
        <rect x="315" y="112" width="170" height="28" rx="5" fill="none" stroke={STROKE} strokeWidth="2" />
        {[350, 400, 450].map((x) => (
          <line key={x} x1={x} y1="150" x2={x} y2="240" stroke={DIM} strokeWidth="1.5" />
        ))}
        {/* vibration marks */}
        {shaking &&
          [[255, 170], [545, 170], [255, 250], [545, 250]].map(([x, y], i) => (
            <motion.path key={i} d={`M${x} ${y} q6 -6 0 -12 q-6 -6 0 -12`} fill="none" stroke={RED} strokeWidth="2"
              animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }} />
          ))}
      </motion.g>

      {/* LEFT mount: fine (dim) */}
      <path d="M300 316 l40 0 l10 32 h-60 z" fill="#23262D" stroke={DIM} strokeWidth="2" />

      {/* RIGHT mount OLD: cracked red, removed step 1 */}
      <motion.g animate={{ y: step >= 1 ? 90 : 0, opacity: step >= 1 ? 0 : 1 }} transition={{ duration: 0.9 }}>
        <path d="M460 316 l40 0 l10 32 h-60 z" fill="#23262D" stroke={RED} strokeWidth="2.5" />
        <path d="M470 320 l10 12 l-6 10 l12 6" fill="none" stroke={RED} strokeWidth="2" />
      </motion.g>

      {/* RIGHT mount NEW: installed step 2 */}
      <motion.g initial={false} animate={{ y: step >= 2 ? 0 : -110, opacity: step >= 2 ? 1 : 0 }} transition={{ duration: 0.9 }}>
        <path d="M460 316 l40 0 l10 32 h-60 z" fill="#23262D" stroke={GREEN} strokeWidth="2.5" />
        <circle cx="480" cy="332" r="7" fill="none" stroke={GREEN} strokeWidth="2" />
      </motion.g>

      {/* stability glow */}
      <motion.rect x="270" y="105" width="264" height="200" rx="16" fill="none" stroke={GREEN} strokeWidth="2"
        animate={{ opacity: step >= 4 ? 0.7 : 0 }} transition={{ duration: 0.8 }} />

      <Label x={480} y={330} tx={620} ty={260} text={step >= 2 ? "New mount" : "Cracked mount"} active={step <= 3} />
      <Label x={320} y={330} tx={170} ty={270} text="Engine mount" active={step === 0} />
      <Label x={400} y={130} tx={620} ty={90} text="Engine" active={step === 0 || step >= 3} />
    </svg>
  );
}
