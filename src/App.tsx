import { useEffect, useRef, useState, type ReactNode } from "react";
import { more, profile, projects, type Project } from "./data/projects";
import { useHash } from "./useHash";
import Tour from "./tour/Tour";
import Guide from "./tour/Guide";
import { tours } from "./tour/tours";
import Board, { type BoardRow } from "./Board";

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ThemeToggle() {
  const [theme, setTheme] = useState<string>(
    () => document.documentElement.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage can be unavailable */
    }
  }, [theme]);
  return (
    <button className="theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

function Header() {
  return (
    <header className="header wrap">
      <a className="brand" href="#/">
        Kalyan Mantha
      </a>
      <nav aria-label="Primary">
        <a href="#/">Routes</a>
        <a href="#/about">About</a>
        <a href="#/contact">Contact</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}

function Links({ links }: { links: Project["links"] }) {
  if (!links.length) return null;
  const verb: Record<string, string> = {
    "Live demo": "Open the live demo",
    "Figma file": "View the Figma file",
    GitHub: "View on GitHub",
    npm: "View on npm",
  };
  return (
    <div className="actions">
      {links.map((l, i) => (
        <a key={l.href} className={i === 0 ? "btn solid" : "btn"} href={l.href} target="_blank" rel="noreferrer">
          {verb[l.label] ?? l.label}
        </a>
      ))}
    </div>
  );
}

/* ---------- Home ---------- */
const boardRows: BoardRow[] = [
  { slug: "clinicq", name: "ClinicQ", status: "Live", label: "ClinicQ, live. Open the route." },
  { slug: "paper-ui", name: "paper-ui", status: "UI kit", label: "paper-ui, a UI kit. Open the route." },
  { slug: "react-resource-ui", name: "react-resource-ui", status: "npm", label: "react-resource-ui, on npm. Open the route." },
  { slug: "complexity-analyzer", name: "Complexity Analyzer", status: "Capstone", label: "Complexity Analyzer, my capstone. Open the route." },
  { slug: "nextplay", name: "NextPlay", status: "Live", label: "NextPlay, live. Open the route." },
  { slug: "hvac-estimate", name: "HVAC Estimate Tool", status: "Live", label: "HVAC Estimate Tool, live. Open the route." },
  { slug: "collabboard", name: "CollabBoard", status: "Frontend", label: "CollabBoard, a frontend project. Open the route." },
];

function Home() {
  const [walking, setWalking] = useState(!prefersReduced());
  useEffect(() => {
    const t = window.setTimeout(() => setWalking(false), 1900);
    return () => window.clearTimeout(t);
  }, []);
  const extra = projects.filter((p) => !tours[p.slug]);

  return (
    <>
      <section className="hero wrap">
        <h1>I build software end to end, from the interface to the database.</h1>
        <p className="lead">
          My clinic scheduling app took 1,000 simultaneous booking requests on 50 slots with zero double-bookings, thanks to row locking and a unique index. Below are seven projects, each with a guide who walks you through it, in a simple or detailed version.
        </p>
        <div className="actions hero-actions">
          <a className="btn solid" href="#/work/clinicq">
            See the ClinicQ case study
          </a>
          <a className="btn" href="#/about">
            About me
          </a>
        </div>
      </section>

      <section className="wrap board-section" aria-label="Routes">
        <Board rows={boardRows} nameCols={19} statusCols={8} animate={!prefersReduced()} />
        <div className="platform">
          <div className={`arrival${walking ? " arriving" : ""}`}>
            <Guide walking={walking} facing={1} />
          </div>
          <p className="hello">Pick a route and I'll walk you through it.</p>
        </div>
      </section>

      <section className="wrap more" aria-labelledby="more-h">
        <h2 id="more-h">{extra.length ? "More routes" : "Smaller builds"}</h2>
        <ul className="rows">
          {extra.map((p) => (
            <li key={p.slug} data-line={p.slug}>
              <a href={`#/work/${p.slug}`}>
                <span className="dot" aria-hidden="true" />
                <span className="rt">{p.title}</span>
                <span className="rd">{p.tagline}</span>
              </a>
            </li>
          ))}
          {more.map((m) => (
            <li key={m.title}>
              <a href={m.href} target="_blank" rel="noreferrer">
                <span className="dot plain" aria-hidden="true" />
                <span className="rt">{m.title}</span>
                <span className="rd">{m.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ---------- Story along a route line ---------- */
function Story({ sections }: { sections: { title: string; body: ReactNode }[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    let idle = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      el.style.setProperty("--p", String(p));
      el.querySelectorAll<HTMLElement>(".stop").forEach((s) => {
        s.classList.toggle("passed", s.offsetTop + 14 < p * r.height);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      if (!prefersReduced()) {
        el.querySelector(".route-walker .guide")?.classList.add("walking");
        window.clearTimeout(idle);
        idle = window.setTimeout(() => el.querySelector(".route-walker .guide")?.classList.remove("walking"), 160);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
    };
  }, []);

  return (
    <div className="story" ref={root}>
      <div className="route-line" aria-hidden="true">
        <div className="route-fill" />
        <div className="route-walker">
          <Guide walking={false} facing={1} />
        </div>
      </div>
      {sections.map((s) => (
        <section key={s.title} className="stop">
          <h2>{s.title}</h2>
          {s.body}
        </section>
      ))}
    </div>
  );
}

function Lines({ items }: { items: string[] }) {
  return (
    <ul className="lines">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function CaseStudy({ p }: { p: Project }) {
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const sections = [
    { title: "Why it exists", body: <p className="big">{p.problem}</p> },
    { title: "What it does", body: <Lines items={p.highlights} /> },
    { title: "Design choices", body: <Lines items={p.design} /> },
    { title: "How it's built", body: <Lines items={p.engineering} /> },
    ...(p.limits ? [{ title: "What's still open", body: <Lines items={p.limits} /> }] : []),
  ];
  return (
    <article data-line={p.slug}>
      <div className="case-head wrap">
        <a className="back" href="#/">
          All routes
        </a>
        <div className="line-tag">
          <span className="badge big" aria-hidden="true">
            {p.title[0]}
          </span>
          <span>
            {p.kind}, {p.status.toLowerCase()}
          </span>
        </div>
        <h1 className="case-title">{p.title}</h1>
        <p className="lead">{p.summary}</p>
        <Links links={p.links} />
        <ul className="stack" aria-label="Technologies">
          {p.stack.join(", ")}
        </ul>
      </div>

      {tours[p.slug] && (
        <div className="wrap tour-wrap">
          <h2 className="tour-h">Walk through {tours[p.slug].name}</h2>
          <Tour data={tours[p.slug]} nextHref={`#/work/${next.slug}`} nextName={next.title} />
        </div>
      )}

      {p.shots && (
        <div className="wrap">
          <div className="shots" data-n={p.shots.length}>
            {p.shots.map((s) => (
              <figure key={s.src}>
                <img className="shot" src={s.src} alt="" loading="lazy" />
                <figcaption>{s.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <div className="wrap">
        <Story sections={sections} />
      </div>

      <a className="next" data-line={next.slug} href={`#/work/${next.slug}`}>
        <span className="wrap">
          <span className="next-k">Next route</span>
          <span className="next-t">{next.title}</span>
        </span>
      </a>
    </article>
  );
}

/* ---------- About / Contact ---------- */
function About() {
  return (
    <div className="wrap page">
      <h1 className="page-h">About</h1>
      <p className="lead">{profile.intro}</p>
      <h2 className="sub">Where I've worked</h2>
      <ol className="timeline">
        {profile.work.map((w) => (
          <li key={w.org}>
            <span className="when">{w.when}</span>
            <h3>
              {w.role}, {w.org}
            </h3>
            <p>{w.text}</p>
          </li>
        ))}
      </ol>
      <h2 className="sub">What I work with</h2>
      <dl className="skills">
        {profile.skills.map((s) => (
          <div key={s.group}>
            <dt>{s.group}</dt>
            <dd>{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
      <h2 className="sub">Education</h2>
      <p>{profile.education}</p>
    </div>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard can be blocked */
    }
  };
  return (
    <div className="wrap page">
      <h1 className="page-h">Say hello</h1>
      <p className="lead">I'm open to software engineering roles across the stack: frontend, backend, full-stack, UI/UX and SQL. Email is the fastest way to reach me.</p>
      <a className="mail" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <div className="actions">
        <button className="btn solid" onClick={copy}>
          {copied ? "Email copied" : "Copy email"}
        </button>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
          Open LinkedIn
        </a>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
          Open GitHub
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const hash = useHash();
  const path = hash.replace(/^#/, "") || "/";
  const [, section, slug] = path.split("/");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${profile.name}, ${profile.role}`;
  }, [path]);

  let view;
  if (section === "work" && slug) {
    const p = projects.find((x) => x.slug === slug);
    view = p ? <CaseStudy p={p} /> : <Home />;
  } else if (section === "about") view = <About />;
  else if (section === "contact") view = <Contact />;
  else view = <Home />;

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} key={path}>
        {view}
      </main>
      <footer className="footer wrap">
        {profile.name}, {profile.location}
      </footer>
    </>
  );
}
