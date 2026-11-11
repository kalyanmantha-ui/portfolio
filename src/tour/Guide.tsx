type Props = { walking: boolean; facing: 1 | -1 };

/** An original, simple character. Legs swing while walking. */
export default function Guide({ walking, facing }: Props) {
  return (
    <svg
      className={`guide${walking ? " walking" : ""}`}
      style={{ transform: `scaleX(${facing})` }}
      viewBox="0 0 60 104"
      width="60"
      height="104"
      aria-hidden="true"
    >
      <ellipse cx="30" cy="100" rx="18" ry="3.5" className="g-shadow" />
      <g className="leg leg-b">
        <rect x="24" y="66" width="8" height="30" rx="4" className="g-pants" />
        <rect x="21" y="92" width="14" height="6" rx="3" className="g-shoe" />
      </g>
      <g className="leg leg-f">
        <rect x="29" y="66" width="8" height="30" rx="4" className="g-pants" />
        <rect x="26" y="92" width="14" height="6" rx="3" className="g-shoe" />
      </g>
      <g className="body">
        <rect x="17" y="36" width="26" height="36" rx="12" className="g-shirt" />
        <g className="arm">
          <rect x="38" y="40" width="7" height="24" rx="3.5" className="g-shirt" />
          <circle cx="41.5" cy="65" r="4" className="g-skin" />
        </g>
        <circle cx="30" cy="22" r="14" className="g-skin" />
        <path d="M16 20c0-10 7-16 15-16s14 5 14 14c-6-2-9-6-12-8-4 5-10 8-17 10z" className="g-hair" />
        <circle cx="35" cy="24" r="1.8" className="g-eye" />
        <path d="M32 30c2 2 5 2 7 0" className="g-mouth" />
      </g>
    </svg>
  );
}
