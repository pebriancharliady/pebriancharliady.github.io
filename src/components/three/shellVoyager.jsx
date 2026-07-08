import { useEffect } from "react"
import { getScrollY } from "../fx/scrollfx"

const SIZE = 360

/*
  Waypoints for the shell's journey down the home page. Each anchor is a
  DOM element carrying data-shell-anchor; the config maps its rect (and
  the viewport) to a target center, scale, and "ink" amount — the
  wireframe prints in ink while it floats over the paper slab.
*/
const ORDER = ["portrait", "works", "caps", "footer"]

const TARGETS = {
  /* docked just off the portrait's top-right corner — the sphere lives
     behind the content plane, so it peeks out past the image edge */
  portrait: (r, vw) => ({
    x: Math.min(r.right + 30, vw - SIZE / 3),
    y: r.top - 10,
    s: 1,
    ink: 0,
  }),
  works: (r, vw, vh) => ({
    x: vw * 0.062,
    y: vh * 0.38,
    s: 0.48,
    ink: 1,
  }),
  caps: (r, vw, vh) => ({
    x: vw * 0.87,
    y: vh * 0.32,
    s: 0.72,
    ink: 0,
  }),
  footer: (r, vw, vh) => ({
    x: vw * 0.72,
    y: vh * 0.5,
    s: 1.18,
    ink: 0,
  }),
}

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = t => Math.max(0, Math.min(1, t))

/**
 * The ghost-shell as a fixed companion: it starts docked at the hero
 * portrait and travels between section anchors as you scroll, shrinking
 * onto the paper margin (in ink), drifting through capabilities, and
 * settling large over the crimson field. Desktop only; reduced motion
 * pins it at the portrait.
 */
const ShellVoyager = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    if (window.matchMedia && window.matchMedia("(max-width: 850px)").matches) {
      return undefined
    }

    /* mounted directly on <body> so position: fixed survives the
       transformed ScrollSmoother content */
    const mount = document.createElement("div")
    mount.setAttribute("aria-hidden", "true")
    Object.assign(mount.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: `${SIZE}px`,
      height: `${SIZE}px`,
      zIndex: "-1",
      pointerEvents: "none",
      willChange: "transform",
    })
    document.body.appendChild(mount)

    let disposed = false
    let raf = null
    let renderer = null
    const disposables = []

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    import("three")
      .then(THREE => {
        if (disposed) return

        try {
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        } catch (e) {
          return
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setSize(SIZE, SIZE)
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 10)
        camera.position.z = 3.1

        const group = new THREE.Group()

        const white = new THREE.Color(0xedeef3)
        const ink = new THREE.Color(0x101118)

        const shellGeo = new THREE.IcosahedronGeometry(1, 2)
        const shellWire = new THREE.WireframeGeometry(shellGeo)
        const shellMat = new THREE.LineBasicMaterial({
          color: 0xedeef3,
          transparent: true,
          opacity: 0.3,
        })
        const shell = new THREE.LineSegments(shellWire, shellMat)

        const nodeMat = new THREE.PointsMaterial({
          color: 0xe13148,
          size: 0.055,
          transparent: true,
          opacity: 0.9,
        })
        const nodes = new THREE.Points(shellGeo, nodeMat)

        const ghostGeo = new THREE.IcosahedronGeometry(0.5, 1)
        const ghostWire = new THREE.WireframeGeometry(ghostGeo)
        const ghostMat = new THREE.LineBasicMaterial({
          color: 0xe13148,
          transparent: true,
          opacity: 0.7,
        })
        const ghost = new THREE.LineSegments(ghostWire, ghostMat)

        disposables.push(
          shellGeo,
          shellWire,
          shellMat,
          nodeMat,
          ghostGeo,
          ghostWire,
          ghostMat
        )

        group.add(shell, nodes, ghost)
        scene.add(group)

        const anchors = ORDER.map(name => ({
          name,
          el: document.querySelector(`[data-shell-anchor="${name}"]`),
        })).filter(a => a.el)

        const targetFor = () => {
          const vw = window.innerWidth
          const vh = window.innerHeight
          if (!anchors.length) {
            return { x: vw * 0.8, y: vh * 0.3, s: 1, ink: 0 }
          }
          const centerDoc = getScrollY() + vh / 2
          const marks = anchors.map(a => {
            const r = a.el.getBoundingClientRect()
            return {
              doc: getScrollY() + r.top + r.height / 2,
              t: TARGETS[a.name](r, vw, vh),
            }
          })
          if (centerDoc <= marks[0].doc) return marks[0].t
          for (let i = 0; i < marks.length - 1; i++) {
            if (centerDoc <= marks[i + 1].doc) {
              const p = clamp01(
                (centerDoc - marks[i].doc) / (marks[i + 1].doc - marks[i].doc)
              )
              return {
                x: lerp(marks[i].t.x, marks[i + 1].t.x, p),
                y: lerp(marks[i].t.y, marks[i + 1].t.y, p),
                s: lerp(marks[i].t.s, marks[i + 1].t.s, p),
                ink: lerp(marks[i].t.ink, marks[i + 1].t.ink, p),
              }
            }
          }
          return marks[marks.length - 1].t
        }

        const cur = { ...targetFor() }

        const apply = () => {
          mount.style.transform = `translate3d(${(cur.x - SIZE / 2).toFixed(
            1
          )}px, ${(cur.y - SIZE / 2).toFixed(1)}px, 0) scale(${cur.s.toFixed(
            3
          )})`
          shellMat.color.copy(white).lerp(ink, cur.ink)
        }

        const renderFrame = t => {
          group.rotation.y = t * 0.00022
          group.rotation.x = Math.sin(t * 0.00013) * 0.22
          ghost.rotation.y = -t * 0.0005
          nodeMat.opacity = 0.55 + 0.35 * Math.sin(t * 0.0021)
          renderer.render(scene, camera)
        }

        if (reduced) {
          apply()
          renderFrame(9000)
          return
        }

        const loop = t => {
          if (!document.hidden) {
            const target = targetFor()
            cur.x = lerp(cur.x, target.x, 0.07)
            cur.y = lerp(cur.y, target.y, 0.07)
            cur.s = lerp(cur.s, target.s, 0.07)
            cur.ink = lerp(cur.ink, target.ink, 0.09)
            apply()
            renderFrame(t)
          }
          raf = window.requestAnimationFrame(loop)
        }
        raf = window.requestAnimationFrame(loop)
      })
      .catch(() => {})

    return () => {
      disposed = true
      if (raf) window.cancelAnimationFrame(raf)
      disposables.forEach(d => d.dispose && d.dispose())
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement && renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement)
        }
      }
      if (mount.parentNode === document.body) {
        document.body.removeChild(mount)
      }
    }
  }, [])

  return null
}

export default ShellVoyager
