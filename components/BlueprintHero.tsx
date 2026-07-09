"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { site, waLink } from "@/lib/site";

const CAR_BODY =
  "M60 200 l50 -12 l60 -58 q10 -10 26 -12 l150 -14 q22 -2 40 8 l92 52 l118 14 q30 4 34 26 l4 26 q2 14 -12 14 h-30";
const ANNOTATIONS: Array<[number, number, number, number, string, number]> = [
  [372, 118, 300, 52, "ENGINE / DRIVETRAIN", 2.0],
  [480, 168, 585, 92, "SUSPENSION & STEERING", 2.5],
  [163, 246, 82, 300, "BRAKES / SPEC CHECK", 3.0],
  [520, 246, 640, 306, "TIMING / SERVICE INTERVAL", 3.5],
];

/**
 * The hero: a technical blueprint of a car that draws itself,
 * wheels spinning in, annotations fading on like an engineering review.
 */
export default function BlueprintHero() {
  const reduce = useReducedMotion();
  const draw = reduce
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: [0, 1], opacity: 1 };

  return (
    <section className="blueprint-grid relative flex min-h-[100svh] items-center overflow-hidden border-b border-steel">
      {/* soft red glow */}
      <div aria-hidden className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="wrap grid items-center gap-14 pb-20 pt-32 lg:grid-cols-2">
        <div>
          <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
            Kampung Serambangun · Tutong · Brunei
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="h-display mt-5 text-4xl leading-[1.04] sm:text-6xl"
          >
            See the repair
            <br />
            <span className="text-accent">before you pay for it.</span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-fog sm:text-lg"
          >
            Interactive engineering animations show you exactly what's worn, what
            we replace, and why. Honest diagnosis, clear estimates, work done right
            the first time.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/experience" className="btn-primary">
              Experience the repair <ArrowRight size={16} aria-hidden />
            </Link>
            <a href={waLink("Hello Teguh Raya Workshop, I would like to book a service.")} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Book on WhatsApp
            </a>
            <a href={`tel:+${site.phoneRaw}`} className="btn-ghost">
              <Phone size={16} aria-hidden /> Call
            </a>
          </motion.div>
        </div>

        {/* Self-drawing blueprint car */}
        <div aria-hidden className="relative">
          <svg viewBox="0 0 700 360" className="h-auto w-full">
            {/* ground line */}
            <motion.line x1="30" y1="290" x2="670" y2="290" stroke="#5A616D" strokeWidth="1.5"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
            {/* body */}
            <motion.path
              d={CAR_BODY} fill="none" stroke="#C7CCD6" strokeWidth="2.5" strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={draw}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
            />
            {/* roofline / windows */}
            <motion.path
              d="M185 132 l120 -11 q14 -1 26 6 l70 44"
              fill="none" stroke="#5A616D" strokeWidth="1.8"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={draw}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 1.4 }}
            />
            {/* wheels */}
            {[[163, 246], [520, 246]].map(([cx, cy], i) => (
              <motion.g key={i}
                style={{ x: cx, y: cy }}
                initial={reduce ? false : { scale: 0, rotate: -120 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 12, delay: 1.7 + i * 0.2 }}
              >
                <circle r="46" fill="#0B0C0E" stroke="#C7CCD6" strokeWidth="2.5" />
                <circle r="17" fill="none" stroke="#5A616D" strokeWidth="1.8" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <line key={a} x1={17 * Math.cos((a * Math.PI) / 180)} y1={17 * Math.sin((a * Math.PI) / 180)}
                    x2={40 * Math.cos((a * Math.PI) / 180)} y2={40 * Math.sin((a * Math.PI) / 180)}
                    stroke="#5A616D" strokeWidth="1.5" />
                ))}
              </motion.g>
            ))}
            {/* dimension line */}
            <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 2.6 }}>
              <line x1="60" y1="322" x2="620" y2="322" stroke="#EB2129" strokeWidth="1" />
              <line x1="60" y1="314" x2="60" y2="330" stroke="#EB2129" strokeWidth="1" />
              <line x1="620" y1="314" x2="620" y2="330" stroke="#EB2129" strokeWidth="1" />
              <text x="292" y="342" fill="#EB2129" fontSize="11" style={{ fontFamily: "ui-monospace, Menlo, monospace", letterSpacing: "0.12em" }}>
                TR-SPEC 001
              </text>
            </motion.g>
            {/* annotations */}
            {ANNOTATIONS.map(([x, y, tx, ty, text, delay]) => (
              <motion.g key={text} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.5 }}>
                <line x1={x} y1={y} x2={tx} y2={ty} stroke="#5A616D" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={x} cy={y} r="3" fill="#EB2129" />
                <text x={tx} y={ty - 5} fill="#A7ADB8" fontSize="10"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace", letterSpacing: "0.12em" }}
                  textAnchor={tx > x ? "start" : "end"}>
                  {text}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-fog to-transparent"
        animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </section>
  );
}
