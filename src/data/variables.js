// Design tokens — "Section 9 dossier"
// Core palette is unchanged; every derived value is a tint/shade of it.
export default {
  // core palette (original)
  primary: "#7F1324",
  inverse: "#fff",
  darkGrey: "#333447",
  black: "#000",

  // grounds — black warmed by a trace of the ink hue
  ground: "#050507",
  panel: "#0c0d14",
  panelEdge: "#14151f",

  // ink family (tints of darkGrey)
  text: "#edeef3",
  dim: "#9a9cad",
  faint: "#5b5d70",

  // crimson family (tints of primary)
  crimson: "#7f1324",
  crimsonDeep: "#420a13",
  signal: "#e13148",
  signalGlow: "rgba(225, 49, 72, 0.35)",

  // hairlines
  line: "rgba(237, 238, 243, 0.16)",
  lineFaint: "rgba(237, 238, 243, 0.07)",

  // type
  fontDisplay: "'GT-Walsheim-Pro-Bold', 'Helvetica Neue', Arial, sans-serif",
  fontMedium: "'GT-Walsheim-Pro-Medium', 'Helvetica Neue', Arial, sans-serif",
  fontBody: "'GT-Walsheim-Pro-Regular', 'Helvetica Neue', Arial, sans-serif",
  fontMono:
    "'IBM Plex Mono', 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', monospace",
  fontJa:
    "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', 'Hiragino Kaku Gothic ProN', serif",

  // layout
  wrapperWidth: "76rem",
  gutter: "clamp(1.25rem, 4vw, 3.5rem)",
  frameInset: "16px",
  frameInsetMobile: "10px",
  breakpointPhone: "850px",
  breakpointTablet: "1024px",
  breakpointLaptop: "1200px",
}
