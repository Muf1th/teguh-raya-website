"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-steel bg-steel lg:grid-cols-4">
      {site.stats.map((s) => (
        <div key={s.label} className="bg-charcoal p-6 sm:p-8">
          <dt className="order-2 mt-2 block text-xs font-medium uppercase tracking-wider text-fog sm:text-sm">
            {s.label}
          </dt>
          <dd className="h-display order-1 text-3xl sm:text-4xl">
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
