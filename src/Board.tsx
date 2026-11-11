import { useEffect, useState } from "react";

const SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function Cell({ ch, delay, animate }: { ch: string; delay: number; animate: boolean }) {
  const [shown, setShown] = useState(animate ? " " : ch);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!animate || ch === " ") {
      setShown(ch);
      return;
    }
    let count = 0;
    const total = 5 + Math.floor(Math.random() * 8);
    let t = 0;
    const step = () => {
      count += 1;
      if (count >= total) {
        setShown(ch);
        setN((v) => v + 1);
        return;
      }
      setShown(SET[Math.floor(Math.random() * SET.length)]);
      setN((v) => v + 1);
      t = window.setTimeout(step, 58);
    };
    t = window.setTimeout(step, delay);
    return () => window.clearTimeout(t);
  }, [ch, delay, animate]);

  return (
    <span className="flap">
      <span key={n} className="flap-face">
        {shown}
      </span>
    </span>
  );
}

function Cells({ text, cols, base, animate }: { text: string; cols: number; base: number; animate: boolean }) {
  const padded = text.toUpperCase().padEnd(cols, " ").slice(0, cols);
  return (
    <span className="cells" aria-hidden="true">
      {padded.split("").map((c, i) => (
        <Cell key={i} ch={c} delay={base + i * 45} animate={animate} />
      ))}
    </span>
  );
}

export type BoardRow = { slug: string; name: string; status: string; label: string };

export default function Board({
  rows,
  nameCols,
  statusCols,
  animate,
}: {
  rows: BoardRow[];
  nameCols: number;
  statusCols: number;
  animate: boolean;
}) {
  return (
    <div className="board">
      <div className="board-head" aria-hidden="true">
        <span>Line</span>
        <span>Route</span>
        <span>Status</span>
      </div>
      {rows.map((r, i) => (
        <a key={r.slug} className="board-row" data-line={r.slug} href={`#/work/${r.slug}`} aria-label={r.label}>
          <span className="badge" aria-hidden="true">
            {r.name[0]}
          </span>
          <Cells text={r.name} cols={nameCols} base={500 + i * 380} animate={animate} />
          <Cells text={r.status} cols={statusCols} base={900 + i * 380} animate={animate} />
          <svg className="chev" viewBox="0 0 12 20" width="12" height="20" aria-hidden="true">
            <path d="M2 2l8 8-8 8" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ))}
    </div>
  );
}
