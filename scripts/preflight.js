/*
  Fails fast when the wrong Node runs this project.

  node_modules here contains darwin-x64 native binaries (sharp,
  node-sass) and Gatsby 2's webpack 4 breaks on Node 17+. The only
  supported runtime on this machine is the x64 Node 16 (runs via
  Rosetta on Apple Silicon).

  Do NOT "npm install" under an arm64 Node to fix the sharp error —
  sharp 0.26 has no arm64 prebuilds and the install will break.
*/

const major = parseInt(process.version.slice(1), 10)

if (major !== 16 || process.arch !== "x64") {
  console.error(
    [
      "",
      `✖ Wrong Node: ${process.version} (${process.arch}) — this project needs Node 16 x64.`,
      "",
      "  Fix (either one):",
      "    nvm use",
      "    export PATH=~/.nvm/versions/node/v16.20.2/bin:$PATH",
      "",
      "  Then verify:  node -v && node -p process.arch   →  v16.20.2 / x64",
      "",
      "  Do NOT run `npm install` under arm64 Node — it will break sharp.",
      "",
    ].join("\n")
  )
  process.exit(1)
}
