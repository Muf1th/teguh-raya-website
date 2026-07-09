"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Label, STROKE, DIM, RED, GREEN } from "./ui";

export const SUSPENSION_STEPS = [
  "A failed shock absorber: the body keeps bouncing long after every bump, and oil leaks from the seals.",
  "The worn, leaking shock absorber is unbolted and removed.",
  "A new gas-pressurised shock absorber is installed and torqued to specification.",
  "Ride height returns exactly to specification.",
  "One bump, one smooth motion — damping fully restored.",
  "Road test passed.",
];

export default function SuspensionScene({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const bouncing = step === 0 && !reduce;
  const settled = step >= 3;
  const smooth = step === 4 && !reduce;

  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Animated suspension repair" className="h-auto w-full">
      {/* road */}
      <line x1="60" y1="400" x2="740" y2="400" stroke={DIM} strokeWidth="2" />
      <path d="M60 400 h680" stroke={STROKE} strokeWidth="1" strokeDasharray="14 18" opacity="0.4" />

      {/* car body — bounces hard when broken, settles when fixed */}
      <motion.g
        animate={
          bouncing
            ? { y: [0, -26, 8, -18, 4, 0] }
            : smooth
            ? { y: [0, -10, 0] }
            : { y: settled ? -8 : 6 }
        }
        transition={
          bouncing
            ? { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
            : smooth
            ? { repeat: Infinity, duration: 2.6, ease: "easeInOut", repeatDelay: 0.8 }
            : { duration: 0.9 }
        }
      >
        <path d="M150 250 l60 -60 h230 l90 45 h90 a24 24 0 0 1 24 24 v30 h-520 v-24 a15 15 0 0 1 15 -15 z"
          fill="#15171C" stroke={STROKE} strokeWidth="2.5" />
        <path d="M225 246 l45 -44 h150 l60 44 z" fill="none" stroke={DIM} strokeWidth="1.5" />
      </motion.g>

      {/* rear wheel (static reference) */}
      <circle cx="235" cy="352" r="46" fill="#0B0C0E" stroke={STROKE} strokeWidth="2.5" />
      <circle cx="235" cy="352" r="18" fill="none" stroke={DIM} strokeWidth="1.5" />

      {/* front wheel */}
      <circle cx="580" cy="352" r="46" fill="#0B0C0E" stroke={STROKE} strokeWidth="2.5" />
      <circle cx="580" cy="352" r="18" fill="none" stroke={DIM} strokeWidth="1.5" />

      {/* OLD shock: leaking, removed at step 1 */}
      <motion.g
        animate={{ x: step >= 1 ? -160 : 0, y: step >= 1 ? 60 : 0, opacity: step >= 1 ? 0 : 1 }}
        transition={{ duration: 0.9 }}
      >
        <line x1="580" y1="300" x2="580" y2="240" stroke={RED} strokeWidth="8" strokeLinecap="round" />
        <rect x="568" y="255" width="24" height="45" rx="5" fill="#23262D" stroke={RED} strokeWidth="2" />
        {/* leak drips */}
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx="588" cy={300 + i * 14} r="3.5" fill={RED}
            animate={{ opacity: step === 0 ? [0, 1, 0] : 0, y: step === 0 ? [0, 22] : 0 }}
            transition={{ repeat: step === 0 && !reduce ? Infinity : 0, duration: 1.4, delay: i * 0.4 }} />
        ))}
      </motion.g>

      {/* NEW shock: appears step 2 */}
      <motion.g
        initial={false}
        animate={{ x: step >= 2 ? 0 : 170, y: step >= 2 ? 0 : -60, opacity: step >= 2 ? 1 : 0 }}
        transition={{ duration: 0.9 }}
      >
        <line x1="580" y1="300" x2="580" y2="238" stroke={GREEN} strokeWidth="8" strokeLinecap="round" />
        <rect x="568" y="252" width="24" height="48" rx="5" fill="#23262D" stroke={GREEN} strokeWidth="2" />
      </motion.g>

      {/* spring (always present, compresses when broken) */}
      <motion.path
        fill="none" stroke={STROKE} strokeWidth="3"
        animate={{ d: settled || step >= 2 ? "M556 300 l48 -8 l-48 -12 l48 -12 l-48 -12 l48 -12" : "M556 300 l48 -6 l-48 -8 l48 -8 l-48 -8 l48 -8" }}
        transition={{ duration: 0.8 }}
      />

      {/* ride-height dimension line (step 3+) */}
      <motion.g animate={{ opacity: step >= 3 ? 1 : 0 }} transition={{ duration: 0.6 }}>
        <line x1="700" y1="400" x2="700" y2="284" stroke={GREEN} strokeWidth="1.5" />
        <line x1="692" y1="400" x2="708" y2="400" stroke={GREEN} strokeWidth="1.5" />
        <line x1="692" y1="284" x2="708" y2="284" stroke={GREEN} strokeWidth="1.5" />
        <text x="712" y="346" fill={GREEN} fontSize="11" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>SPEC ✓</text>
      </motion.g>

      <Label x={580} y={270} tx={430} ty={120} text={step >= 2 ? "New shock absorber" : "Leaking shock"} active={step <= 4} />
      <Label x={604} y={276} tx={700} ty={200} text="Coil spring" active={step === 0 || step === 4} />
    </svg>
  );
}
