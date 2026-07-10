"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { site, waLink } from "@/lib/site";

const CAR_BODY =
  "M60 200 l50 -12 l60 -58 q10 -10 26 -12 l150 -14 q22 -2 40 8 l92 52 l118 14 q30 4 34 26 l4 26 q2 14 -12 14 h-30";

// System annotations pulse in sequence, like a live diagnostic readout.
const SYSTEMS: Array<[number, number, number, number, string]> = [
  [372, 118, 300, 52, "ENGINE · OK"],
  [480, 168, 585, 92, "SUSPENSION · OK"],
  [163, 246, 82, 300, "BRAKES · OK"],
  [520, 246, 640, 306, "TRANSMISSION · OK"],
];

/**
 * "Living diagnostic bay": the blueprint car draws itself once, then the
 * scene never stops — wheels turn, a scan beam sweeps, systems report in,
 * and stray parts drift in the depth. Continuous, calm, cheap to render.
 */
export default function BlueprintHero() {
  const reduce = useReducedMotion();
  const draw = reduce ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 1], opacity: 1 };

  return (
    <section className="blueprint-grid relative flex min-h-[100svh] items-center overflow-hidden border-b border-steel">
      {/* breathing glow */}
      <motion.div
        aria-hidden
        className="absolute -right-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
        animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      {/* drifting background parts */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 opacity-[0.12]">
          {/* gear */}
          <motion.svg viewBox="0 0 100 100" className="absolute left-[6%] top-[16%] w-24"
            animate={{ rotate: 360, y: [0, 14, 0] }}
            transition={{ rotate: { repeat: Infinity, duration: 40, ease: "linear" }, y: { repeat: Infinity, duration: 9, ease: "easeInOut" } }}>
            <circle cx="50" cy="50" r="26" fill="none" stroke="#C7CCD6" strokeWidth="3" />
            <circle cx="50" cy="50" r="9" fill="none" stroke="#C7CCD6" strokeWidth="3" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x="46" y="14" width="8" height="12" fill="#C7CCD6"
                transform={`rotate(${i * 45} 50 50)`} />
            ))}
          </motion.svg>
          {/* bolt */}
          <motion.svg viewBox="0 0 100 100" className="absolute bottom-[14%] left-[14%] w-14"
            animate={{ rotate: -360, y: [0, -10, 0] }}
            transition={{ rotate: { repeat: Infinity, duration: 55, ease: "linear" }, y: { repeat: Infinity, duration: 11, ease: "easeInOut" } }}>
            <path d="M50 12 l32 19 v38 l-32 19 l-32 -19 v-38 z" fill="none" stroke="#C7CCD6" strokeWidth="3" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="#C7CCD6" strokeWidth="3" />
          </motion.svg>
          {/* piston ring */}
          <motion.svg viewBox="0 0 100 100" className="absolute right-[8%] top-[64%] w-16"
            animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}>
            <circle cx="50" cy="50" r="30" fill="none" stroke="#C7CCD6" strokeWidth="3" strokeDasharray="150 40" />
          </motion.svg>
        </div>
      )}

      <div className="wrap relative grid items-center gap-14 pb-24 pt-36 lg:grid-cols-2">
        <div>
          <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
            Kampung Serambangun · Tutong · Brunei
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="h-display mt-6 text-4xl leading-[1.04] sm:text-6xl"
          >
            See the repair
            <br />
            <span className="text-accent">before you pay for it.</span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-7 max-w-lg text-base leading-relaxed text-fog sm:text-lg"
          >
            Interactive engineering animations show you exactly what&rsquo;s worn, what
            we replace, and why. Honest diagnosis, clear estimates, work done right
            the first time.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/booking" className="btn-primary">
              Book a Service <ArrowRight size={16} aria-hidden />
            </Link>
            <a href={waLink("Hello Teguh Raya Workshop, I would like to book a service.")} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              WhatsApp Us
            </a>
            <a href={`tel:+${site.phoneRaw}`} className="btn-ghost">
              <Phone size={16} aria-hidden /> Call
            </a>
          </motion.div>
        </div>

        {/* Living blueprint car */}
        <div aria-hidden className="relative">
          <svg viewBox="0 0 700 380" className="h-auto w-full">
            <defs>
              <linearGradient id="scan" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#EB2129" stopOpacity="0" />
                <stop offset="0.5" stopColor="#EB2129" stopOpacity="0.55" />
                <stop offset="1" stopColor="#EB2129" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ground: flowing dashed line = the bay is live */}
            <motion.line
              x1="30" y1="290" x2="670" y2="290" stroke="#5A616D" strokeWidth="1.5" strokeDasharray="10 12"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, strokeDashoffset: [0, -88] }}
              transition={{ opacity: { delay: 0.3 }, strokeDashoffset: { repeat: Infinity, duration: 4, ease: "linear" } }}
            />

            {/* body draws once */}
            <motion.path
              d={CAR_BODY} fill="none" stroke="#C7CCD6" strokeWidth="2.5" strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={draw}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.path
              d="M185 132 l120 -11 q14 -1 26 6 l70 44"
              fill="none" stroke="#5A616D" strokeWidth="1.8"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={draw}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 1.4 }}
            />

            {/* wheels spring in, then turn forever */}
            {[[163, 246], [520, 246]].map(([cx, cy], i) => (
              <motion.g key={i} style={{ x: cx, y: cy }}
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 70, damping: 12, delay: 1.7 + i * 0.2 }}
              >
                <circle r="46" fill="#0B0C0E" stroke="#C7CCD6" strokeWidth="2.5" />
                <motion.g
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 9, ease: "linear", delay: 2.4 }}
                >
                  <circle r="17" fill="none" stroke="#5A616D" strokeWidth="1.8" />
                  {[0, 72, 144, 216, 288].map((a) => (
                    <line key={a} x1={17 * Math.cos((a * Math.PI) / 180)} y1={17 * Math.sin((a * Math.PI) / 180)}
                      x2={40 * Math.cos((a * Math.PI) / 180)} y2={40 * Math.sin((a * Math.PI) / 180)}
                      stroke="#5A616D" strokeWidth="1.5" />
                  ))}
                </motion.g>
              </motion.g>
            ))}

            {/* diagnostic scan beam: sweeps the car endlessly */}
            {!reduce && (
              <motion.rect
                y="86" width="56" height="180" fill="url(#scan)"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: [40, 610, 40], opacity: [0, 1, 1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 2.8, repeatDelay: 1.2 }}
              />
            )}

            {/* system readouts pulse in sequence */}
            {SYSTEMS.map(([x, y, tx, ty, text], i) => (
              <motion.g key={text}
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
                transition={reduce ? undefined : { repeat: Infinity, duration: 6, delay: 2.6 + i * 1.5, ease: "easeInOut" }}
              >
                <line x1={x} y1={y} x2={tx} y2={ty} stroke="#5A616D" strokeWidth="1" strokeDasharray="3 3" />
                <motion.circle cx={x} cy={y} r="3.5" fill="#EB2129"
                  animate={reduce ? undefined : { r: [3, 4.5, 3] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} />
                <text x={tx} y={ty - 5} fill="#A7ADB8" fontSize="10"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace", letterSpacing: "0.12em" }}
                  textAnchor={tx > x ? "start" : "end"}>
                  {text}
                </text>
              </motion.g>
            ))}

            {/* spec stamp */}
            <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 2.6 }}>
              <line x1="60" y1="322" x2="620" y2="322" stroke="#EB2129" strokeWidth="1" />
              <line x1="60" y1="314" x2="60" y2="330" stroke="#EB2129" strokeWidth="1" />
              <line x1="620" y1="314" x2="620" y2="330" stroke="#EB2129" strokeWidth="1" />
              <text x="292" y="344" fill="#EB2129" fontSize="11"
                style={{ fontFamily: "ui-monospace, Menlo, monospace", letterSpacing: "0.12em" }}>
                DIAGNOSTIC · LIVE
              </text>
            </motion.g>
          </svg>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-fog to-transparent"
        animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </section>
  );
}
