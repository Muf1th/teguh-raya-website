"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";

type Props = {
  steps: string[];          // caption per step
  badge: string;            // final "✓ ..." message
  stepMs?: number;
  render: (step: number) => ReactNode; // the SVG scene for a given step
  autoPlay?: boolean;
};

/**
 * The interactive player every repair scene runs inside.
 * Play/pause, step arrows, and a draggable timeline — the customer
 * can watch the repair or scrub through it by hand.
 */
export default function SceneShell({ steps, badge, stepMs = 2600, render, autoPlay = true }: Props) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const last = steps.length - 1;
  const done = step === last;

  // Start playing the first time the scene scrolls into view
  useEffect(() => {
    if (!autoPlay || started) return;
    const el = shellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay, started]);

  // Advance while playing
  useEffect(() => {
    if (!playing) return;
    if (step >= last) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, last)), stepMs);
    return () => clearTimeout(t);
  }, [playing, step, last, stepMs]);

  const go = useCallback((s: number) => {
    setPlaying(false);
    setStep(Math.max(0, Math.min(last, s)));
  }, [last]);

  return (
    <div ref={shellRef} className="card overflow-hidden">
      {/* Scene canvas */}
      <div className="blueprint-grid relative border-b border-steel bg-ink">
        {render(step)}
        {done && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#34D399]/60 bg-ink/90 px-4 py-2 font-display text-sm font-bold text-[#34D399]">
              <CheckCircle2 size={16} aria-hidden /> {badge}
            </span>
          </div>
        )}
      </div>

      {/* Caption */}
      <p aria-live="polite" className="min-h-12 px-5 pt-4 text-sm leading-relaxed text-fog sm:px-6">
        <span className="mono-label mr-3 text-accent">Step {step + 1}/{steps.length}</span>
        {steps[step]}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-3 px-5 pb-5 pt-3 sm:px-6">
        <button
          onClick={() => (done ? (setStep(0), setPlaying(true)) : setPlaying((p) => !p))}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-paper"
          aria-label={done ? "Replay" : playing ? "Pause" : "Play"}
        >
          {done ? <RotateCcw size={18} aria-hidden /> : playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
        </button>
        <button onClick={() => go(step - 1)} disabled={step === 0}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-steel disabled:opacity-30"
          aria-label="Previous step">
          <ChevronLeft size={18} aria-hidden />
        </button>
        <button onClick={() => go(step + 1)} disabled={done}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-steel disabled:opacity-30"
          aria-label="Next step">
          <ChevronRight size={18} aria-hidden />
        </button>
        <label className="flex flex-1 items-center gap-3">
          <span className="sr-only">Scrub through the repair</span>
          <input
            type="range" min={0} max={last} value={step}
            onChange={(e) => go(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </label>
      </div>
    </div>
  );
}
