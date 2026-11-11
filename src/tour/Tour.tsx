import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Guide from "./Guide";
import { arts } from "./arts";
import type { TourData } from "./tours";

type Mode = "simple" | "detailed";
type Phase = "ask" | "tour" | "done";

const WALK_MS = 1100;

function useMedia(query: string): boolean {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

export default function Tour({ data, nextHref, nextName }: { data: TourData; nextHref: string; nextName: string }) {
  const n = data.stations.length;
  const narrow = useMedia("(max-width: 700px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");

  const [phase, setPhase] = useState<Phase>("ask");
  const [mode, setMode] = useState<Mode>("simple");
  const [idx, setIdx] = useState(0);
  const [walking, setWalking] = useState(false);
  const [facing, setFacing] = useState<1 | -1>(1);
  const timer = useRef<number | undefined>(undefined);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const [gw, setGw] = useState(900);

  useLayoutEffect(() => {
    const el = groundRef.current;
    if (!el) return;
    const measure = () => setGw(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const walkTo = useCallback(
    (next: number) => {
      setIdx((cur) => {
        if (next !== cur) setFacing(next > cur ? 1 : -1);
        return next;
      });
      window.clearTimeout(timer.current);
      if (reduced) {
        setWalking(false);
        return;
      }
      setWalking(true);
      timer.current = window.setTimeout(() => setWalking(false), WALK_MS);
    },
    [reduced],
  );

  const start = (m: Mode) => {
    setMode(m);
    setPhase("tour");
    setFacing(1);
    walkTo(0);
  };
  const next = () => {
    if (idx >= n - 1) {
      setPhase("done");
      setWalking(false);
      return;
    }
    walkTo(idx + 1);
  };
  const back = () => {
    if (idx > 0) walkTo(idx - 1);
  };
  const restart = () => {
    window.clearTimeout(timer.current);
    setWalking(false);
    setPhase("ask");
    setIdx(0);
    setFacing(1);
  };
  const jump = (i: number) => {
    if (phase === "ask") return;
    setPhase("tour");
    walkTo(i);
  };

  // Keep the live region's controls reachable after each step.
  useEffect(() => {
    if (phase !== "ask") bubbleRef.current?.setAttribute("data-step", String(idx));
  }, [phase, idx]);

  const pct = phase === "tour" ? ((idx + 0.5) / n) * 100 : 50;
  const station = data.stations[idx];
  const bw = narrow ? gw : Math.min(340, gw);
  const guideX = (pct / 100) * gw;
  const bubbleLeft = Math.max(0, Math.min(guideX - bw / 2, gw - bw));
  const tail = Math.max(24, Math.min(guideX - bubbleLeft, bw - 24));
  const shown = narrow ? [idx] : data.stations.map((_, i) => i);

  return (
    <section className="tour" aria-label={`Guided tour of ${data.name}`}>
      <div className="stage">
        <div className="stations" data-narrow={narrow}>
          {shown.map((i) => {
            const s = data.stations[i];
            const Art = arts[s.art];
            const active = phase === "tour" && i === idx && !walking;
            return (
              <button
                key={s.title}
                className={`station${active ? " active" : ""}${phase === "ask" ? " idle" : ""}`}
                onClick={() => jump(i)}
                disabled={phase === "ask"}
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-current={phase === "tour" && i === idx ? "step" : undefined}
              >
                <Art on={active || (phase === "ask" && !narrow)} />
                <span className="station-title">
                  <b>{i + 1}</b> {s.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="ground" ref={groundRef}>
          <div
            className="bubble-wrap"
            style={{ marginLeft: bubbleLeft, width: bw }}
          >
            <div className="bubble" ref={bubbleRef} role="status" aria-live="polite" style={{ ["--tail" as string]: `${tail}px` }}>
              {phase === "ask" && (
                <>
                  <p>
                    Hi, I'm your guide. I'll walk you through <b>{data.name}</b>. Which version do you want?
                  </p>
                  <div className="bubble-actions">
                    <button className="btn primary" onClick={() => start("simple")}>
                      Simple version
                    </button>
                    <button className="btn" onClick={() => start("detailed")}>
                      Detailed version
                    </button>
                  </div>
                </>
              )}
              {phase === "tour" && (
                <>
                  {walking ? (
                    <p className="walking-text">Let me show you…</p>
                  ) : (
                    <>
                      <p className="step-label">
                        Step {idx + 1} of {n}: {station.title}
                      </p>
                      <p>{mode === "simple" ? station.simple : station.detailed}</p>
                      {mode === "detailed" && station.tech && (
                        <ul className="tags small" aria-label="Technical terms">
                          {station.tech.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                  <div className="bubble-actions">
                    <button className="btn" onClick={back} disabled={idx === 0}>
                      Back
                    </button>
                    <button className="btn primary" onClick={next} disabled={walking}>
                      {idx === n - 1 ? "Finish" : "Next"}
                    </button>
                    <button className="linkish" onClick={() => setMode(mode === "simple" ? "detailed" : "simple")}>
                      {mode === "simple" ? "Switch to details" : "Switch to simple"}
                    </button>
                  </div>
                </>
              )}
              {phase === "done" && (
                <>
                  <p>That's the tour. Want to go around again?</p>
                  <div className="bubble-actions">
                    <button className="btn primary" onClick={() => start(mode === "simple" ? "detailed" : "simple")}>
                      Replay the {mode === "simple" ? "detailed" : "simple"} version
                    </button>
                    <button className="btn" onClick={restart}>
                      Start over
                    </button>
                    <a className="btn" href={nextHref}>
                      Next route: {nextName}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lane">
            <div className="lane-fill" style={{ width: `${phase === "tour" ? pct : phase === "done" ? 100 : 0}%` }} />
            {data.stations.map((_, i) => (
              <span
                key={i}
                className={`step-dot${phase === "tour" && i === idx ? " here" : ""}${phase !== "ask" && i < idx ? " past" : ""}`}
                style={{ left: `${((i + 0.5) / n) * 100}%` }}
              />
            ))}
            <div className="walker" style={{ left: `${pct}%` }}>
              <Guide walking={walking} facing={facing} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
