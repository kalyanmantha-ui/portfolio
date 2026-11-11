import type { ReactNode } from "react";
import type { ArtKey } from "./tours";

type P = { on: boolean };

function Frame({ on, children, label }: { on: boolean; children: ReactNode; label: string }) {
  return (
    <svg className="art" data-on={on} viewBox="0 0 160 120" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

function Person({ x, y, cls = "f-text" }: { x: number; y: number; cls?: string }) {
  return (
    <g className={cls}>
      <circle cx={x} cy={y - 9} r={6} />
      <rect x={x - 8} y={y - 2} width={16} height={15} rx={7} />
    </g>
  );
}

/* ---------- ClinicQ ---------- */
function ClinicDay({ on }: P) {
  const cols = [14, 58, 102];
  const rows = [30, 52, 74, 96];
  return (
    <Frame on={on} label="A calendar grid with one column per doctor and booked and free appointment times">
      {cols.map((x, ci) => (
        <g key={x}>
          <circle cx={x + 20} cy={16} r={5} className="f-mut" />
          {rows.map((y, ri) => {
            const booked = (ci + ri) % 2 === 0;
            const hot = ci === 1 && ri === 2;
            return (
              <rect
                key={y}
                x={x}
                y={y}
                width={40}
                height={16}
                rx={4}
                className={`${booked ? "f-acc soft" : "f-tag"} ${hot ? "pulse f-acc" : ""}`}
              />
            );
          })}
        </g>
      ))}
    </Frame>
  );
}

function Race({ on }: P) {
  return (
    <Frame on={on} label="Two people both reaching for the same appointment slot">
      <Person x={24} y={34} />
      <Person x={136} y={34} cls="f-mut" />
      <path d="M32 46 L62 78" className="s-acc dash" />
      <path d="M128 46 L98 78" className="s-mut dash" />
      <rect x={58} y={78} width={44} height={22} rx={5} className="f-surf s-acc w2" />
      <text x={80} y={93} textAnchor="middle" className="f-text t12">10:00</text>
      <text x={80} y={16} textAnchor="middle" className="f-mut t10 pulse">at the same moment</text>
    </Frame>
  );
}

function Lock({ on }: P) {
  return (
    <Frame on={on} label="A lock lets one person book the slot while the other is told it is taken">
      <rect x={52} y={14} width={56} height={22} rx={5} className="f-surf s-acc w2" />
      <text x={80} y={29} textAnchor="middle" className="f-text t12">10:00</text>
      <rect x={70} y={54} width={20} height={16} rx={3} className="f-acc" />
      <path d="M74 54v-5a6 6 0 0 1 12 0v5" className="s-acc w2 nofill" />
      <Person x={30} y={96} />
      <path d="M38 88 L64 40" className="s-good w2 nofill" />
      <text x={30} y={116} textAnchor="middle" className="f-good t10">booked</text>
      <g className="bump">
        <Person x={130} y={96} cls="f-mut" />
      </g>
      <path d="M122 88 L96 62" className="s-bad w2 nofill dash" />
      <text x={130} y={116} textAnchor="middle" className="f-bad t10">taken</text>
    </Frame>
  );
}

function Waitlist({ on }: P) {
  return (
    <Frame on={on} label="A cancelled slot is offered to the next person with a fifteen minute countdown">
      <rect x={12} y={44} width={50} height={26} rx={5} className="nofill s-mut w2 dashed" />
      <text x={37} y={61} textAnchor="middle" className="f-mut t10">free</text>
      <path d="M66 57 L100 57" className="s-acc w2 nofill dash" />
      <circle cx={122} cy={55} r={26} className="s-line w3 nofill" />
      <circle cx={122} cy={55} r={26} className="s-acc w3 nofill ring" />
      <Person x={122} y={58} />
      <text x={122} y={100} textAnchor="middle" className="f-text t12">15:00</text>
      <text x={122} y={14} textAnchor="middle" className="f-mut t10">next in line</text>
    </Frame>
  );
}

function Roles({ on }: P) {
  const tiles = [
    { x: 10, y: 14, t: "Patient", w: [26, 18] },
    { x: 84, y: 14, t: "Reception", w: [32, 26] },
    { x: 10, y: 66, t: "Doctor", w: [22, 30] },
    { x: 84, y: 66, t: "Admin", w: [34, 20] },
  ];
  return (
    <Frame on={on} label="Four roles, patient, receptionist, doctor and admin, each with a different view">
      {tiles.map((t, i) => (
        <g key={t.t} className="fade" style={{ animationDelay: `${i * 0.25}s` }}>
          <rect x={t.x} y={t.y} width={66} height={44} rx={6} className="f-surf s-line w2" />
          <text x={t.x + 8} y={t.y + 15} className="f-text t10 bold">{t.t}</text>
          <rect x={t.x + 8} y={t.y + 22} width={t.w[0]} height={5} rx={2.5} className="f-acc soft" />
          <rect x={t.x + 8} y={t.y + 31} width={t.w[1]} height={5} rx={2.5} className="f-tag" />
        </g>
      ))}
    </Frame>
  );
}

function Proof({ on }: P) {
  const t = [
    { x: 10, y: 14, n: "0", l: "double-booked" },
    { x: 84, y: 14, n: "48", l: "component tests" },
    { x: 10, y: 66, n: "11", l: "browser tests" },
    { x: 84, y: 66, n: "100", l: "Lighthouse" },
  ];
  return (
    <Frame on={on} label="Test results: zero double-bookings, 48 component tests, 11 browser tests, Lighthouse 100">
      {t.map((s, i) => (
        <g key={s.l} className="fade" style={{ animationDelay: `${i * 0.25}s` }}>
          <rect x={s.x} y={s.y} width={66} height={44} rx={6} className="f-surf s-line w2" />
          <text x={s.x + 33} y={s.y + 24} textAnchor="middle" className="f-acc-t t20 bold">{s.n}</text>
          <text x={s.x + 33} y={s.y + 38} textAnchor="middle" className="f-mut t9">{s.l}</text>
        </g>
      ))}
    </Frame>
  );
}

/* ---------- paper-ui ---------- */
function Blocks({ on }: P) {
  return (
    <Frame on={on} label="Four matching interface parts: a button, a text field, a pop-up and a menu">
      <g className="fade" style={{ animationDelay: "0s" }}>
        <rect x={12} y={16} width={60} height={24} rx={12} className="f-acc" />
        <text x={42} y={32} textAnchor="middle" className="f-on-acc t11">Save</text>
      </g>
      <g className="fade" style={{ animationDelay: ".2s" }}>
        <rect x={88} y={16} width={60} height={24} rx={5} className="f-surf s-mut w2" />
        <rect x={94} y={26} width={26} height={4} rx={2} className="f-tag" />
      </g>
      <g className="fade" style={{ animationDelay: ".4s" }}>
        <rect x={12} y={56} width={60} height={50} rx={6} className="f-surf s-line w2" />
        <rect x={18} y={63} width={30} height={5} rx={2.5} className="f-text" />
        <rect x={18} y={74} width={46} height={4} rx={2} className="f-tag" />
        <rect x={40} y={90} width={26} height={10} rx={5} className="f-acc" />
      </g>
      <g className="fade" style={{ animationDelay: ".6s" }}>
        <rect x={88} y={56} width={60} height={20} rx={5} className="f-surf s-mut w2" />
        <path d="M134 64l4 5 4-5" className="s-text w2 nofill" />
        <rect x={88} y={80} width={60} height={26} rx={5} className="f-surf s-line w2" />
        <rect x={94} y={86} width={30} height={4} rx={2} className="f-tag" />
        <rect x={94} y={95} width={22} height={4} rx={2} className="f-tag" />
      </g>
    </Frame>
  );
}

function Tokens({ on }: P) {
  return (
    <Frame on={on} label="A raw colour is given a meaningful name, and a button uses that name">
      <rect x={8} y={44} width={34} height={34} rx={8} className="f-acc" />
      <text x={25} y={94} textAnchor="middle" className="f-mut t9">raw colour</text>
      <path d="M46 61h14" className="s-mut w2 nofill dash" />
      <rect x={62} y={50} width={46} height={22} rx={11} className="f-surf s-acc w2" />
      <text x={85} y={64} textAnchor="middle" className="f-text t9">accent</text>
      <text x={85} y={94} textAnchor="middle" className="f-mut t9">semantic name</text>
      <path d="M112 61h10" className="s-mut w2 nofill dash" />
      <rect x={124} y={50} width={30} height={22} rx={11} className="f-acc" />
    </Frame>
  );
}

function Theme({ on }: P) {
  return (
    <Frame on={on} label="A switch changes a light screen into a dark screen">
      <rect x={14} y={14} width={132} height={64} rx={8} className="f-surf s-line w2" />
      <rect x={14} y={14} width={132} height={64} rx={8} className="f-dark sweep" />
      <rect x={24} y={26} width={50} height={6} rx={3} className="f-acc" />
      <rect x={24} y={40} width={90} height={5} rx={2.5} className="f-mut soft" />
      <rect x={24} y={52} width={72} height={5} rx={2.5} className="f-mut soft" />
      <rect x={52} y={92} width={56} height={22} rx={11} className="f-tag s-line w2" />
      <circle cx={63} cy={103} r={8} className="f-acc knob" />
    </Frame>
  );
}

function Modal({ on }: P) {
  return (
    <Frame on={on} label="A pop-up where keyboard focus moves between controls but stays inside">
      <rect x={4} y={4} width={152} height={112} rx={8} className="f-tag" />
      <rect x={24} y={20} width={112} height={84} rx={8} className="f-surf s-line w2" />
      <rect x={34} y={30} width={50} height={6} rx={3} className="f-text" />
      <rect x={34} y={46} width={92} height={14} rx={4} className="f-surf s-mut w2" />
      <rect x={34} y={72} width={40} height={18} rx={9} className="f-tag s-mut w2" />
      <rect x={82} y={72} width={44} height={18} rx={9} className="f-acc" />
      <rect x={31} y={43} width={98} height={20} rx={6} className="s-acc w3 nofill focusjump" />
    </Frame>
  );
}

function Dropdown({ on }: P) {
  return (
    <Frame on={on} label="A menu where arrow keys move the highlight down the options">
      <rect x={30} y={12} width={100} height={22} rx={5} className="f-surf s-mut w2" />
      <text x={40} y={27} className="f-text t11">Choose one</text>
      <path d="M112 20l5 6 5-6" className="s-text w2 nofill" />
      <rect x={30} y={38} width={100} height={72} rx={5} className="f-surf s-line w2" />
      <rect x={34} y={42} width={92} height={20} rx={4} className="f-acc soft hl" />
      {["First", "Second", "Third"].map((t, i) => (
        <text key={t} x={42} y={56 + i * 22} className="f-text t11">{t}</text>
      ))}
    </Frame>
  );
}

function Kanban({ on }: P) {
  return (
    <Frame on={on} label="A Kanban board with a card moving from one column to the next">
      {[10, 58, 106].map((x, i) => (
        <g key={x}>
          <rect x={x} y={12} width={44} height={96} rx={6} className="f-tag" />
          <rect x={x + 6} y={18} width={20} height={4} rx={2} className="f-mut" />
          {i < 2 && <rect x={x + 6} y={30} width={32} height={16} rx={4} className="f-surf s-line w2" />}
        </g>
      ))}
      <rect x={16} y={52} width={32} height={16} rx={4} className="f-acc cardmove" />
    </Frame>
  );
}

/* ---------- react-resource-ui ---------- */
function List({ on }: P) {
  return (
    <Frame on={on} label="A long list of rows">
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i} className="fade" style={{ animationDelay: `${i * 0.12}s` }}>
          <rect x={30} y={8 + i * 15} width={100} height={11} rx={4} className={i % 3 === 0 ? "f-acc soft" : "f-tag"} />
        </g>
      ))}
      <text x={80} y={116} textAnchor="middle" className="f-mut t10">... and thousands more</text>
    </Frame>
  );
}

function Modes({ on }: P) {
  return (
    <Frame on={on} label="Three ways to browse a list: numbered pages, a load more button, and endless scrolling">
      <g className="cyc" style={{ animationDelay: "0s" }}>
        <rect x={6} y={20} width={46} height={80} rx={6} className="f-surf s-line w2" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={17 + i * 12} cy={86} r={4} className={i === 0 ? "f-acc" : "f-tag"} />
        ))}
        <rect x={12} y={28} width={34} height={8} rx={3} className="f-tag" />
        <rect x={12} y={42} width={34} height={8} rx={3} className="f-tag" />
        <text x={29} y={14} textAnchor="middle" className="f-mut t9">pages</text>
      </g>
      <g className="cyc" style={{ animationDelay: "1.2s" }}>
        <rect x={57} y={20} width={46} height={80} rx={6} className="f-surf s-line w2" />
        <rect x={63} y={28} width={34} height={8} rx={3} className="f-tag" />
        <rect x={63} y={42} width={34} height={8} rx={3} className="f-tag" />
        <rect x={63} y={74} width={34} height={14} rx={7} className="f-acc" />
        <text x={80} y={14} textAnchor="middle" className="f-mut t9">load more</text>
      </g>
      <g className="cyc" style={{ animationDelay: "2.4s" }}>
        <rect x={108} y={20} width={46} height={80} rx={6} className="f-surf s-line w2" />
        <rect x={114} y={28} width={34} height={8} rx={3} className="f-tag" />
        <rect x={114} y={42} width={34} height={8} rx={3} className="f-tag" />
        <path d="M131 66v16m-6-6l6 6 6-6" className="s-acc w2 nofill" />
        <text x={131} y={14} textAnchor="middle" className="f-mut t9">endless</text>
      </g>
    </Frame>
  );
}

function Stale({ on }: P) {
  return (
    <Frame on={on} label="An old slow request finishes after a newer one and is ignored">
      <text x={8} y={28} className="f-mut t10">old request</text>
      <rect x={8} y={34} width={120} height={8} rx={4} className="f-tag" />
      <rect x={8} y={34} width={120} height={8} rx={4} className="f-mut grow-slow" />
      <text x={8} y={72} className="f-mut t10">new request</text>
      <rect x={8} y={78} width={120} height={8} rx={4} className="f-tag" />
      <rect x={8} y={78} width={120} height={8} rx={4} className="f-acc grow-fast" />
      <text x={140} y={86} textAnchor="middle" className="f-good t16 bold pop-fast">✓</text>
      <text x={140} y={42} textAnchor="middle" className="f-bad t16 bold pop-slow">✕</text>
      <text x={80} y={110} textAnchor="middle" className="f-text t10">late answer ignored</text>
    </Frame>
  );
}

function Window({ on }: P) {
  return (
    <Frame on={on} label="A window slides down a very long list so only the visible rows are drawn">
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={36} y={6 + i * 14} width={88} height={10} rx={4} className="f-tag" />
      ))}
      <g className="slidey">
        <rect x={30} y={4} width={100} height={44} rx={6} className="s-acc w3 nofill" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={36} y={8 + i * 14} width={88} height={10} rx={4} className="f-acc soft" />
        ))}
      </g>
      <text x={80} y={116} textAnchor="middle" className="f-mut t10">only these rows are drawn</text>
    </Frame>
  );
}

function Skins({ on }: P) {
  return (
    <Frame on={on} label="The same list shown in three different visual styles">
      {[
        { x: 6, r: 2, fill: "f-surf s-text w2" },
        { x: 57, r: 10, fill: "f-acc soft" },
        { x: 108, r: 6, fill: "f-tag s-acc w2" },
      ].map((s, i) => (
        <g key={s.x} className="cyc" style={{ animationDelay: `${i * 1.2}s` }}>
          {[0, 1, 2].map((j) => (
            <rect key={j} x={s.x} y={20 + j * 28} width={46} height={22} rx={s.r} className={s.fill} />
          ))}
        </g>
      ))}
      <text x={80} y={112} textAnchor="middle" className="f-mut t10">same logic, your design</text>
    </Frame>
  );
}

/* ---------- Complexity Analyzer ---------- */
function Capture({ on }: P) {
  return (
    <Frame on={on} label="A browser window with code, an extension picking it up and sending it to a local server">
      <rect x={6} y={14} width={90} height={80} rx={6} className="f-surf s-line w2" />
      <rect x={6} y={14} width={90} height={12} rx={6} className="f-tag" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={14 + (i % 3) * 6} y={34 + i * 11} width={[56, 40, 62, 30, 48][i]} height={5} rx={2.5} className={i === 2 ? "f-acc soft" : "f-mut soft"} />
      ))}
      <path d="M98 54 L124 54" className="s-acc w2 nofill dash" />
      <rect x={126} y={38} width={28} height={34} rx={5} className="f-surf s-acc w2" />
      <circle cx={140} cy={52} r={4} className="f-acc" />
      <rect x={133} y={60} width={14} height={3} rx={1.5} className="f-mut" />
      <text x={140} y={88} textAnchor="middle" className="f-mut t9">server</text>
    </Frame>
  );
}

function Loops({ on }: P) {
  return (
    <Frame on={on} label="One loop inside another loop, counted as depth two">
      <rect x={14} y={10} width={132} height={86} rx={10} className="nofill s-acc w3 pulse" />
      <text x={24} y={26} className="f-acc-t t10 bold">loop 1</text>
      <rect x={34} y={34} width={92} height={52} rx={8} className="nofill s-acc w3 pulse" style={{ animationDelay: ".4s" }} />
      <text x={44} y={50} className="f-acc-t t10 bold">loop 2</text>
      <rect x={46} y={58} width={68} height={6} rx={3} className="f-mut soft" />
      <text x={80} y={114} textAnchor="middle" className="f-text t12 bold">depth 2</text>
    </Frame>
  );
}

function Model({ on }: P) {
  const cols = [
    [30, 60, 90],
    [30, 50, 70, 90],
    [45, 75],
  ];
  const xs = [12, 46, 80];
  return (
    <Frame on={on} label="A neural network choosing between four growth rates">
      {cols[0].map((a) =>
        cols[1].map((b) => <line key={`${a}-${b}`} x1={xs[0]} y1={a} x2={xs[1]} y2={b} className="s-line" />),
      )}
      {cols[1].map((a) =>
        cols[2].map((b) => <line key={`${a}-${b}`} x1={xs[1]} y1={a} x2={xs[2]} y2={b} className="s-line" />),
      )}
      {cols.map((c, ci) => c.map((y, i) => <circle key={`${ci}-${i}`} cx={xs[ci]} cy={y} r={5} className={ci === 1 ? "f-acc node" : "f-surf s-mut w2"} style={{ animationDelay: `${i * 0.2}s` }} />))}
      {["O(1)", "O(log N)", "O(N)", "O(N²)"].map((t, i) => (
        <text key={t} x={102} y={36 + i * 20} className={i === 2 ? "f-acc-t t10 bold" : "f-mut t10"}>{t}</text>
      ))}
    </Frame>
  );
}

function Override({ on }: P) {
  return (
    <Frame on={on} label="A rule corrects a wrong guess from quadratic to linear">
      <rect x={10} y={20} width={64} height={30} rx={6} className="f-surf s-bad w2" />
      <text x={42} y={40} textAnchor="middle" className="f-bad t12 bold strike">O(N²)</text>
      <path d="M78 35h14m-5-5l5 5-5 5" className="s-mut w2 nofill" />
      <rect x={96} y={20} width={54} height={30} rx={6} className="f-surf s-good w2 fade" />
      <text x={123} y={40} textAnchor="middle" className="f-good t12 bold">O(N)</text>
      <path d="M80 112l-16-6v-14c0-8 7-14 16-16 9 2 16 8 16 16v14z" className="f-acc soft" transform="translate(0,-22)" />
      <path d="M72 78l6 6 10-12" className="s-acc w3 nofill" />
      <text x={80} y={114} textAnchor="middle" className="f-mut t10">rule checks the model</text>
    </Frame>
  );
}

function Result({ on }: P) {
  return (
    <Frame on={on} label="A result card showing time and space complexity with reasoning">
      <rect x={20} y={6} width={120} height={96} rx={8} className="f-surf s-line w2" />
      <text x={32} y={26} className="f-mut t10">Time</text>
      <text x={128} y={30} textAnchor="end" className="f-acc-t t14 bold">O(N)</text>
      <line x1={30} y1={40} x2={130} y2={40} className="s-line" />
      <text x={32} y={56} className="f-mut t10">Space</text>
      <text x={128} y={56} textAnchor="end" className="f-text t14 bold">O(1)</text>
      <line x1={30} y1={66} x2={130} y2={66} className="s-line" />
      <rect x={32} y={76} width={86} height={5} rx={2.5} className="f-mut soft" />
      <rect x={32} y={88} width={62} height={5} rx={2.5} className="f-mut soft" />
      <text x={80} y={115} textAnchor="middle" className="f-mut t9">example</text>
    </Frame>
  );
}


/* ---------- HVAC, NextPlay, CollabBoard ---------- */
function Messy({ on }: P) {
  return (
    <Frame on={on} label="Differently named fields on the left are turned into one clean set on the right">
      <text x={6} y={14} className="f-mut t9">baseCost</text>
      <text x={6} y={32} className="f-mut t9">base_cost</text>
      <text x={6} y={50} className="f-mut t9">sqft</text>
      <text x={6} y={68} className="f-mut t9">squareFootage</text>
      <path d="M72 40 L92 58" className="s-acc w2 nofill dash" />
      <rect x={96} y={34} width={58} height={50} rx={6} className="f-surf s-acc w2" />
      <text x={125} y={55} textAnchor="middle" className="f-text t10">cost</text>
      <text x={125} y={72} textAnchor="middle" className="f-text t10">area</text>
      <rect x={20} y={90} width={52} height={18} rx={9} className="f-tag" />
      <text x={46} y={102} textAnchor="middle" className="f-mut t9 pulse">Not on file</text>
    </Frame>
  );
}

function Range({ on }: P) {
  return (
    <Frame on={on} label="A price shown as a range from low to high with a running total">
      <rect x={14} y={30} width={132} height={60} rx={8} className="f-surf s-line w2" />
      <rect x={26} y={62} width={108} height={10} rx={5} className="f-tag" />
      <rect x={44} y={62} width={70} height={10} rx={5} className="f-acc grow-slow" />
      <text x={44} y={54} textAnchor="middle" className="f-text t12">$480</text>
      <text x={114} y={54} textAnchor="middle" className="f-text t12">$820</text>
      <text x={80} y={110} textAnchor="middle" className="f-mut t10">low to high</text>
      <text x={80} y={18} textAnchor="middle" className="f-mut t10 pulse">live total</text>
    </Frame>
  );
}

function Quick({ on }: P) {
  return (
    <Frame on={on} label="A short list for quick visits and a long itemized list for full replacements">
      <text x={40} y={14} textAnchor="middle" className="f-mut t10">Quick</text>
      <rect x={10} y={22} width={60} height={86} rx={6} className="f-surf s-line w2" />
      <rect x={16} y={32} width={48} height={10} rx={4} className="f-acc cyc" />
      <rect x={16} y={48} width={48} height={10} rx={4} className="f-tag" />
      <text x={120} y={14} textAnchor="middle" className="f-mut t10">Detailed</text>
      <rect x={90} y={22} width={60} height={86} rx={6} className="f-surf s-line w2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={96} y={30 + i * 15} width={48} height={10} rx={4} className={`${i % 2 ? "f-tag" : "f-acc soft"} fade`} style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </Frame>
  );
}

function Fuzzy({ on }: P) {
  return (
    <Frame on={on} label="A search box with a misspelled word still finding the right brand">
      <rect x={14} y={14} width={132} height={26} rx={13} className="f-surf s-acc w2" />
      <text x={30} y={31} className="f-text t12">carier</text>
      <circle cx={130} cy={27} r={5} className="nofill s-mut w2" />
      <rect x={14} y={52} width={132} height={22} rx={6} className="f-acc soft pulse" />
      <text x={26} y={67} className="f-on-acc t12">Carrier furnace</text>
      <rect x={14} y={80} width={132} height={22} rx={6} className="f-tag" />
      <text x={26} y={95} className="f-mut t12">Trane heat pump</text>
    </Frame>
  );
}

function Print({ on }: P) {
  return (
    <Frame on={on} label="A printed estimate page with a signature line">
      <rect x={44} y={8} width={72} height={104} rx={5} className="f-surf s-line w2" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={54} y={20 + i * 14} width={52} height={7} rx={3} className="f-tag fade" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <rect x={54} y={64} width={30} height={9} rx={3} className="f-acc" />
      <path d="M56 98 C62 88 66 104 72 94 S84 96 90 92" className="s-acc w2 nofill dash" />
      <path d="M54 102 H106" className="s-mut" />
      <text x={80} y={4} textAnchor="middle" className="f-mut t9"> </text>
    </Frame>
  );
}

function Guest({ on }: P) {
  return (
    <Frame on={on} label="A visitor arrives and is quietly given a private guest session">
      <Person x={34} y={62} />
      <path d="M50 56 L88 56" className="s-acc w2 nofill dash" />
      <rect x={92} y={34} width={52} height={44} rx={8} className="f-surf s-acc w2" />
      <circle cx={118} cy={50} r={6} className="f-acc" />
      <rect x={104} y={60} width={28} height={8} rx={4} className="f-tag" />
      <text x={118} y={98} textAnchor="middle" className="f-text t10">guest id</text>
      <text x={34} y={98} textAnchor="middle" className="f-mut t10">no sign-up</text>
    </Frame>
  );
}

function Rls({ on }: P) {
  return (
    <Frame on={on} label="Rows in a database pass through a shield and only the visitor's own rows come out">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={10} y={14 + i * 24} width={40} height={16} rx={4} className={i === 1 || i === 3 ? "f-acc" : "f-tag"} />
      ))}
      <path d="M62 60 H92" className="s-mut w2 nofill dash" />
      <path d="M80 28 L106 36 V62 C106 78 94 88 80 94 C66 88 54 78 54 62 V36 Z" className="f-surf s-acc w2 pulse" transform="translate(30 0)" />
      <path d="M118 60 H132" className="s-acc w2 nofill dash" />
      <rect x={120} y={52} width={30} height={16} rx={4} className="f-acc" />
      <text x={133} y={86} textAnchor="middle" className="f-text t9">yours</text>
    </Frame>
  );
}

function Drop({ on }: P) {
  return (
    <Frame on={on} label="A card is dragged to a new column and saved">
      {[10, 58, 106].map((x) => (
        <rect key={x} x={x} y={12} width={44} height={84} rx={6} className="f-tag" />
      ))}
      <rect x={16} y={30} width={32} height={16} rx={4} className="f-acc cardmove" />
      <text x={80} y={112} textAnchor="middle" className="f-good t10 pop-fast">saved</text>
    </Frame>
  );
}

function Optimistic({ on }: P) {
  return (
    <Frame on={on} label="A card moves at once, then jumps back when saving fails">
      {[10, 58, 106].map((x) => (
        <rect key={x} x={x} y={12} width={44} height={84} rx={6} className="f-tag" />
      ))}
      <rect x={16} y={30} width={32} height={16} rx={4} className="f-acc rollback" />
      <text x={80} y={112} textAnchor="middle" className="f-bad t10 pulse">couldn't save, put back</text>
    </Frame>
  );
}

function MenuMove({ on }: P) {
  return (
    <Frame on={on} label="A card menu offers Move to options for people who cannot drag">
      <rect x={14} y={14} width={68} height={26} rx={6} className="f-surf s-line w2" />
      <text x={20} y={31} className="f-text t10">Fix login</text>
      <circle cx={68} cy={27} r={2} className="f-mut" /><circle cx={73} cy={27} r={2} className="f-mut" />
      <rect x={52} y={46} width={96} height={64} rx={8} className="f-surf s-acc w2" />
      {["Move to Doing", "Move to Review", "Move to Done"].map((t, i) => (
        <g key={t}>
          {i === 1 && <rect x={58} y={70} width={84} height={16} rx={4} className="f-acc soft hl" />}
          <text x={64} y={64 + i * 18} className="f-text t10">{t}</text>
        </g>
      ))}
    </Frame>
  );
}

function MockFile({ on }: P) {
  return (
    <Frame on={on} label="Screens talk to one pretend server file that could be swapped for a real one">
      {[10, 34, 58].map((y) => (<rect key={y} x={8} y={y} width={40} height={16} rx={4} className="f-tag" />))}
      <path d="M52 50 L74 50" className="s-acc w2 nofill dash" />
      <rect x={78} y={28} width={44} height={44} rx={6} className="f-surf s-acc w2" />
      <text x={100} y={54} textAnchor="middle" className="f-text t10">mock</text>
      <path d="M126 50 L142 50" className="s-mut w2 nofill dashed" />
      <circle cx={148} cy={50} r={6} className="nofill s-mut w2 dashed" />
      <text x={100} y={96} textAnchor="middle" className="f-mut t10 pulse">swap later</text>
    </Frame>
  );
}

function States({ on }: P) {
  return (
    <Frame on={on} label="Loading, empty and error screens shown one after another">
      <g className="cyc" style={{ animationDelay: "0s" }}>
        <rect x={8} y={20} width={44} height={80} rx={6} className="f-surf s-line w2" />
        {[0, 1, 2].map((i) => (<rect key={i} x={14} y={30 + i * 18} width={32} height={10} rx={4} className="f-tag pulse" />))}
        <text x={30} y={14} textAnchor="middle" className="f-mut t9">loading</text>
      </g>
      <g className="cyc" style={{ animationDelay: "1.2s" }}>
        <rect x={58} y={20} width={44} height={80} rx={6} className="f-surf s-line w2" />
        <circle cx={80} cy={56} r={9} className="nofill s-mut w2 dashed" />
        <text x={80} y={14} textAnchor="middle" className="f-mut t9">empty</text>
      </g>
      <g className="cyc" style={{ animationDelay: "2.4s" }}>
        <rect x={108} y={20} width={44} height={80} rx={6} className="f-surf s-bad w2" />
        <text x={130} y={62} textAnchor="middle" className="f-bad t20 bold">!</text>
        <text x={130} y={14} textAnchor="middle" className="f-mut t9">error</text>
      </g>
    </Frame>
  );
}

export const arts: Record<ArtKey, (p: P) => ReactNode> = {
  clinicDay: ClinicDay, race: Race, lock: Lock, waitlist: Waitlist, roles: Roles, proof: Proof,
  blocks: Blocks, tokens: Tokens, theme: Theme, modal: Modal, dropdown: Dropdown, kanban: Kanban,
  list: List, modes: Modes, stale: Stale, window: Window, skins: Skins,
  capture: Capture, loops: Loops, model: Model, override: Override, result: Result,
  quick: Quick, messy: Messy, range: Range, fuzzy: Fuzzy, print: Print, guest: Guest, rls: Rls, drop: Drop,
  optimistic: Optimistic, mockfile: MockFile, menumove: MenuMove, states: States,
};
