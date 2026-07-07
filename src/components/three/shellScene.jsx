import React, { useEffect, useRef } from "react"

/**
 * The ghost-scan: a slowly rotating wireframe shell (white) with a
 * counter-rotating crimson core inside it. Three.js is loaded lazily on
 * the client only; if WebGL or the chunk fails the element simply stays
 * empty — it is purely decorative. Reduced-motion users get a single
 * static frame.
 */
const ShellScene = ({ className }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || typeof window === "undefined") return undefined

    let disposed = false
    let visible = true
    let raf = null
    let renderer = null
    let io = null
    let onResize = null
    const disposables = []

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    import("three")
      .then(THREE => {
        if (disposed) return

        const width = mount.clientWidth || 320
        const height = mount.clientHeight || 320

        try {
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        } catch (e) {
          return
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setSize(width, height)
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 10)
        camera.position.z = 3.1

        const group = new THREE.Group()

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

        const renderFrame = t => {
          group.rotation.y = t * 0.00022
          group.rotation.x = Math.sin(t * 0.00013) * 0.22
          ghost.rotation.y = -t * 0.0005
          nodeMat.opacity = 0.55 + 0.35 * Math.sin(t * 0.0021)
          renderer.render(scene, camera)
        }

        if (reduced) {
          renderFrame(9000)
          return
        }

        const loop = t => {
          if (visible && !document.hidden) renderFrame(t)
          raf = window.requestAnimationFrame(loop)
        }
        raf = window.requestAnimationFrame(loop)

        if (typeof IntersectionObserver !== "undefined") {
          io = new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting
          })
          io.observe(mount)
        }

        onResize = () => {
          const w = mount.clientWidth || width
          const h = mount.clientHeight || height
          renderer.setSize(w, h)
          camera.aspect = w / h
          camera.updateProjectionMatrix()
        }
        window.addEventListener("resize", onResize)
      })
      .catch(() => {})

    return () => {
      disposed = true
      if (raf) window.cancelAnimationFrame(raf)
      if (io) io.disconnect()
      if (onResize) window.removeEventListener("resize", onResize)
      disposables.forEach(d => d.dispose && d.dispose())
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement && renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}

export default ShellScene
