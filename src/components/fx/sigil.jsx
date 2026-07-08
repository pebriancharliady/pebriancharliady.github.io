import React from "react"

/*
  Bioresonance sigil — concentric rings, a hexagram, cardinal ticks and
  ideograms: 殻 shell · 魂 soul · 機 machine · 体 body. Pure decoration.
*/
const Sigil = ({ className, color = "#7f1324" }) => (
  <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
    <g fill="none" stroke={color} strokeWidth="1">
      <circle cx="200" cy="200" r="196" />
      <circle cx="200" cy="200" r="188" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="160" strokeDasharray="3 8" />
      <circle cx="200" cy="200" r="118" />
      <polygon points="200,60 321.2,130 321.2,270 200,340 78.8,270 78.8,130" />
      <polygon
        points="200,340 321.2,270 321.2,130 200,60 78.8,130 78.8,270"
        strokeWidth="0.5"
        transform="rotate(30 200 200)"
      />
      <circle cx="200" cy="200" r="36" />
      <line x1="200" y1="164" x2="200" y2="236" strokeWidth="0.75" />
      <line x1="164" y1="200" x2="236" y2="200" strokeWidth="0.75" />
      <line x1="200" y1="2" x2="200" y2="24" />
      <line x1="200" y1="376" x2="200" y2="398" />
      <line x1="2" y1="200" x2="24" y2="200" />
      <line x1="376" y1="200" x2="398" y2="200" />
      <rect x="196" y="56" width="8" height="8" transform="rotate(45 200 60)" />
      <rect
        x="196"
        y="336"
        width="8"
        height="8"
        transform="rotate(45 200 340)"
      />
    </g>
    <g
      fill={color}
      fontFamily="'Hiragino Mincho ProN', 'Yu Mincho', serif"
      fontSize="19"
      textAnchor="middle"
    >
      <text x="200" y="146">殻</text>
      <text x="200" y="272">魂</text>
      <text x="128" y="208">機</text>
      <text x="272" y="208">体</text>
    </g>
  </svg>
)

export default Sigil
