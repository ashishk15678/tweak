"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// ── helpers ──────────────────────────────────────────────────────────────────

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hsbToRgb(h: number, s: number, b: number): [number, number, number] {
  const sNorm = s / 100;
  const bNorm = b / 100;
  const c = bNorm * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = bNorm - c;
  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
}

function rgbToHsb(r: number, g: number, b: number): [number, number, number] {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rN) h = 60 * (((gN - bN) / delta) % 6);
    else if (max === gN) h = 60 * ((bN - rN) / delta + 2);
    else h = 60 * ((rN - gN) / delta + 4);
  }
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : (delta / max) * 100;
  const bright = max * 100;
  return [Math.round(h), Math.round(s), Math.round(bright)];
}

interface TargetColor {
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  b_: number;
}

function generateRandomColor(): TargetColor {
  const r = randomInt(0, 255);
  const g = randomInt(0, 255);
  const b = randomInt(0, 255);
  const [h, s, b_] = rgbToHsb(r, g, b);
  return { r, g, b, h, s, b_ };
}

function computeScore(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
): number {
  const maxDist = Math.sqrt(255 ** 2 * 3);
  const dist = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  const raw = 1 + 9 * (1 - dist / maxDist);
  return Math.round(raw * 10) / 10;
}

// ── Generic Slider (works vertical & horizontal) ────────────────────────────

interface SliderProps {
  min?: number;
  max?: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
  trackBackground: string;
  thumbColor?: string;
  /** "vertical" = tall & thin, "horizontal" = wide & short */
  orientation?: "vertical" | "horizontal";
}

function Slider({
  min = 0,
  max = 100,
  value,
  onChange,
  label,
  trackBackground,
  thumbColor,
  orientation = "vertical",
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const isVert = orientation === "vertical";

  const calculateValue = useCallback(
    (clientPos: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      if (isVert) {
        const y = clientPos - rect.top;
        const pct = Math.min(Math.max(y / rect.height, 0), 1);
        return Math.round(max - pct * (max - min));
      } else {
        const x = clientPos - rect.left;
        const pct = Math.min(Math.max(x / rect.width, 0), 1);
        return Math.round(min + pct * (max - min));
      }
    },
    [min, max, value, isVert],
  );

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const pos =
        "touches" in e
          ? isVert
            ? e.touches[0].clientY
            : e.touches[0].clientX
          : isVert
            ? e.clientY
            : e.clientX;
      onChange(calculateValue(pos));
    },
    [isDragging, onChange, calculateValue, isVert],
  );

  const handleEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // thumb position %
  const pct = isVert
    ? ((max - value) / (max - min)) * 100
    : ((value - min) / (max - min)) * 100;

  const startDrag = (clientPos: number) => {
    setIsDragging(true);
    onChange(calculateValue(clientPos));
  };

  // transform the gradient for horizontal mode
  const bgStyle = isVert
    ? trackBackground
    : trackBackground.replace("to bottom", "to right");

  return (
    <div
      className={
        isVert
          ? "flex flex-col items-center gap-1.5"
          : "flex flex-row items-center gap-2 w-full"
      }
    >
      <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider select-none shrink-0 w-4 text-center">
        {label}
      </span>
      <div
        ref={trackRef}
        className={`relative rounded-full cursor-pointer touch-none overflow-hidden ${
          isVert ? "w-6 flex-1" : "h-6 flex-1"
        }`}
        style={{ background: bgStyle }}
        onMouseDown={(e) => startDrag(isVert ? e.clientY : e.clientX)}
        onTouchStart={(e) =>
          startDrag(isVert ? e.touches[0].clientY : e.touches[0].clientX)
        }
      >
        <div
          className={`absolute rounded-full border-2 border-white pointer-events-none ${
            isVert
              ? "left-1/2 w-8 h-2.5 -translate-x-1/2 -translate-y-1/2"
              : "top-1/2 h-8 w-2.5 -translate-x-1/2 -translate-y-1/2"
          }`}
          style={{
            ...(isVert ? { top: `${pct}%` } : { left: `${pct}%` }),
            backgroundColor: thumbColor ?? "white",
            boxShadow: "0 0 6px rgba(0,0,0,0.4)",
          }}
        />
      </div>
      <span className="text-[10px] font-mono text-neutral-400 shrink-0 w-6 text-center select-none">
        {value}
      </span>
    </div>
  );
}

// ── Phases & animation config ────────────────────────────────────────────────

type Phase = "memorize" | "guess" | "result";

const PHASE_ORDER: Phase[] = ["memorize", "guess", "result"];

function phaseIndex(p: Phase) {
  return PHASE_ORDER.indexOf(p);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [phase, setPhase] = useState<Phase>("memorize");
  const [prevPhase, setPrevPhase] = useState<Phase | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetColor, setTargetColor] = useState<TargetColor>(() =>
    generateRandomColor(),
  );
  const [countdown, setCountdown] = useState(4);

  const [guessH, setGuessH] = useState(180);
  const [guessS, setGuessS] = useState(50);
  const [guessB, setGuessB] = useState(50);
  const [score, setScore] = useState<number | null>(null);

  // ref tracks current phase so transitionTo never needs the state value
  const phaseRef = useRef<Phase>("memorize");

  // animated phase transition — no setState inside setState
  const transitionTo = useCallback((next: Phase) => {
    const current = phaseRef.current;
    if (current === next) return;
    setPrevPhase(current);
    setIsAnimating(true);
    setPhase(next);
    phaseRef.current = next;
  }, []);

  // clear animation flag after transition completes
  useEffect(() => {
    if (!isAnimating) return;
    const t = setTimeout(() => {
      setIsAnimating(false);
      setPrevPhase(null);
    }, 500);
    return () => clearTimeout(t);
  }, [isAnimating]);

  // countdown timer
  useEffect(() => {
    if (phase !== "memorize") return;
    if (countdown <= 0) return;
    const t = setTimeout(() => {
      if (countdown <= 1) {
        transitionTo("guess");
      } else {
        setCountdown((c) => c - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, countdown, transitionTo]);

  const handleSubmit = useCallback(() => {
    const [gr, gg, gb] = hsbToRgb(guessH, guessS, guessB);
    const s = computeScore(
      targetColor.r,
      targetColor.g,
      targetColor.b,
      gr,
      gg,
      gb,
    );
    setScore(s);
    transitionTo("result");
  }, [guessH, guessS, guessB, targetColor, transitionTo]);

  const handleRestart = useCallback(() => {
    const newColor = generateRandomColor();
    setTargetColor(newColor);
    setCountdown(4);
    setGuessH(180);
    setGuessS(50);
    setGuessB(50);
    setScore(null);
    setPrevPhase(null);
    setIsAnimating(false);
    setPhase("memorize");
    phaseRef.current = "memorize";
  }, []);

  // memoize derived values to avoid recomputation on unrelated re-renders
  const targetRgbStr = useMemo(
    () => `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`,
    [targetColor],
  );

  const [guessR, guessG, guessGb] = useMemo(
    () => hsbToRgb(guessH, guessS, guessB),
    [guessH, guessS, guessB],
  );
  const guessRgbStr = `rgb(${guessR}, ${guessG}, ${guessGb})`;

  // slider track backgrounds — only recompute when guess HSB changes
  const hueTrack =
    "linear-gradient(to bottom, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))";

  const satTrack = useMemo(
    () =>
      `linear-gradient(to bottom, hsl(${guessH},100%,50%), hsl(${guessH},0%,50%))`,
    [guessH],
  );

  const brightTrack = useMemo(
    () => `linear-gradient(to bottom, hsl(${guessH},${guessS}%,50%), #000)`,
    [guessH, guessS],
  );

  // ── animation classes ──────────────────────────────────────────────────────

  // direction: new phase slides in from right, old slides out to left (forward)
  // for restart we skip animation entirely

  const getSlideClass = (panelPhase: Phase): string => {
    if (!isAnimating || !prevPhase) {
      // no animation — just show / hide
      return phase === panelPhase ? "translate-x-0 opacity-100" : "hidden";
    }

    const goingForward = phaseIndex(phase) > phaseIndex(prevPhase);

    if (panelPhase === phase) {
      // entering panel
      return goingForward
        ? "animate-slide-in-from-right"
        : "animate-slide-in-from-left";
    }
    if (panelPhase === prevPhase) {
      // leaving panel
      return goingForward
        ? "animate-slide-out-to-left"
        : "animate-slide-out-to-right";
    }
    return "hidden";
  };

  const shouldRender = (panelPhase: Phase) =>
    phase === panelPhase || (isAnimating && prevPhase === panelPhase);

  return (
    <>
      {/* keyframe styles — injected once */}
      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(60px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOutToLeft {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(-60px); opacity: 0; }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-60px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideOutToRight {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(60px); opacity: 0; }
        }
        .animate-slide-in-from-right {
          animation: slideInFromRight 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .animate-slide-out-to-left {
          animation: slideOutToLeft 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
          position: absolute; inset: 0;
        }
        .animate-slide-in-from-left {
          animation: slideInFromLeft 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .animate-slide-out-to-right {
          animation: slideOutToRight 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
          position: absolute; inset: 0;
        }
      `}</style>

      <div className="min-h-screen w-screen flex items-center justify-center text-black p-4">
        <div className="border border-border shadow-sm p-5   sm:p-6 rounded-4xl  relative overflow-hidden">
          {/* fixed-size stage so card doesn't jump around */}
          <div className="relative w-75 sm:w-85 min-h-105 sm:min-h-110 flex items-center justify-center">
            {/* ─── MEMORIZE ─── */}
            {shouldRender("memorize") && (
              <div
                className={`w-full flex flex-col items-center gap-6 ${getSlideClass("memorize")}`}
              >
                <h1 className="text-xl sm:text-2xl font-thin tracking-tight">
                  Memorize this color
                </h1>
                <div
                  className="w-full aspect-square max-w-70 rounded-3xl shadow-2xl transition-colors duration-300"
                  style={{ backgroundColor: targetRgbStr }}
                />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-5xl font-thin tabular-nums">
                    {countdown}
                  </span>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest">
                    seconds left
                  </span>
                </div>
              </div>
            )}

            {/* ─── GUESS ─── */}
            {shouldRender("guess") && (
              <div
                className={`w-full flex flex-col items-center gap-4 ${getSlideClass("guess")}`}
              >
                <h1 className="text-xl sm:text-2xl font-thin tracking-tight">
                  Guess the color
                </h1>

                {/* Main area: sliders + swatch */}
                <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
                  {/* ── Desktop: vertical sliders on left ── */}
                  <div className="hidden sm:flex flex-row gap-2 h-55">
                    <Slider
                      min={0}
                      max={360}
                      value={guessH}
                      onChange={setGuessH}
                      label="H"
                      orientation="vertical"
                      trackBackground={hueTrack}
                      thumbColor={`hsl(${guessH}, 100%, 50%)`}
                    />
                    <Slider
                      min={0}
                      max={100}
                      value={guessS}
                      onChange={setGuessS}
                      label="S"
                      orientation="vertical"
                      trackBackground={satTrack}
                      thumbColor={`hsl(${guessH}, ${guessS}%, ${50}%)`}
                    />
                    <Slider
                      min={0}
                      max={100}
                      value={guessB}
                      onChange={setGuessB}
                      label="B"
                      orientation="vertical"
                      trackBackground={brightTrack}
                      thumbColor={guessRgbStr}
                    />
                  </div>

                  {/* Color preview swatch — fills remaining space */}
                  <div
                    className="flex-1 min-h-45 sm:min-h-55 rounded-2xl border border-neutral-200 shadow-inner transition-colors duration-75"
                    style={{ backgroundColor: guessRgbStr }}
                  />
                </div>

                {/* ── Mobile: horizontal sliders below ── */}
                <div className="flex sm:hidden flex-col gap-2 w-full">
                  <Slider
                    min={0}
                    max={360}
                    value={guessH}
                    onChange={setGuessH}
                    label="H"
                    orientation="horizontal"
                    trackBackground={hueTrack}
                    thumbColor={`hsl(${guessH}, 100%, 50%)`}
                  />
                  <Slider
                    min={0}
                    max={100}
                    value={guessS}
                    onChange={setGuessS}
                    label="S"
                    orientation="horizontal"
                    trackBackground={satTrack}
                    thumbColor={`hsl(${guessH}, ${guessS}%, 50%)`}
                  />
                  <Slider
                    min={0}
                    max={100}
                    value={guessB}
                    onChange={setGuessB}
                    label="B"
                    orientation="horizontal"
                    trackBackground={brightTrack}
                    thumbColor={guessRgbStr}
                  />
                </div>

                <span className="text-[11px] font-mono text-neutral-400">
                  H {guessH}° &nbsp; S {guessS}% &nbsp; B {guessB}%
                </span>

                <button
                  onClick={handleSubmit}
                  className="w-full py-2.5 rounded-full bg-black text-white font-medium text-sm uppercase tracking-wider hover:bg-neutral-800 active:scale-[0.97] transition-all cursor-pointer"
                >
                  Submit
                </button>
              </div>
            )}

            {/* ─── RESULT ─── */}
            {shouldRender("result") && (
              <div
                className={`w-full flex flex-col items-center gap-5 ${getSlideClass("result")}`}
              >
                <h1 className="text-xl sm:text-2xl font-thin tracking-tight">
                  Your Score
                </h1>

                {/* side-by-side colors */}
                <div className="flex gap-3 w-full">
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full aspect-square rounded-2xl shadow-md"
                      style={{ backgroundColor: targetRgbStr }}
                    />
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                      Target
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full aspect-square rounded-2xl shadow-md"
                      style={{ backgroundColor: guessRgbStr }}
                    />
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                      Yours
                    </span>
                  </div>
                </div>

                {/* score */}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-5xl font-thin tabular-nums">
                    {score !== null ? score.toFixed(1) : "–"}
                  </span>
                  <span className="text-xs text-neutral-400">out of 10</span>
                </div>

                {/* bar */}
                <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${((score ?? 0) / 10) * 100}%`,
                      background:
                        (score ?? 0) >= 8
                          ? "linear-gradient(90deg, #22c55e, #4ade80)"
                          : (score ?? 0) >= 5
                            ? "linear-gradient(90deg, #eab308, #facc15)"
                            : "linear-gradient(90deg, #ef4444, #f87171)",
                    }}
                  />
                </div>

                <span className="text-sm text-neutral-400">
                  {(score ?? 0) >= 9
                    ? "Incredible! Nearly perfect"
                    : (score ?? 0) >= 7
                      ? "Great eye! Very close "
                      : (score ?? 0) >= 5
                        ? "Not bad, keep practicing"
                        : "Better luck next time! "}
                </span>

                <button
                  onClick={handleRestart}
                  className="w-full py-2.5 rounded-full bg-zinc-100 text-zinc-700 font-thin text-sm uppercase tracking-wider hover:bg-neutral-800 active:scale-[0.97] transition-all cursor-pointer"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
