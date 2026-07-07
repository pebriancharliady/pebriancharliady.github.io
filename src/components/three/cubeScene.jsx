import React, { useEffect, useRef } from "react"

/**
 * A large wireframe cube drifting behind the hero copy. Its rotation is
 * coupled to the page scroll, so scrolling turns the cube. Decorative
 * only — absent if WebGL is unavailable, static under reduced motion.
 */
const CubeScene = ({ className }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || typeof window === "undefined") return undefined

    let disposed = false
    let raf = null
    let renderer = null
    let onResize = null
    const disposables = []

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    import("three")
      .then(THREE => {
        if (disposed) return

        const width = mount.clientWidth || 500
        const height = mount.clientHeight || 500

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
        const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 10)
        camera.position.z = 2.7

        const group = new THREE.Group()

        const boxGeo = new THREE.BoxGeometry(1.28, 1.28, 1.28)
        const boxEdges = new THREE.EdgesGeometry(boxGeo)
        const boxMat = new THREE.LineBasicMaterial({
          color: 0xedeef3,
          transparent: true,
          opacity: 0.14,
        })
        const box = new THREE.LineSegments(boxEdges, boxMat)

        const coreGeo = new THREE.BoxGeometry(0.62, 0.62, 0.62)
        const coreEdges = new THREE.EdgesGeometry(coreGeo)
        const coreMat = new THREE.LineBasicMaterial({
          color: 0xe13148,
          transparent: true,
          opacity: 0.22,
        })
        const core = new THREE.LineSegments(coreEdges, coreMat)

        disposables.push(boxGeo, boxEdges, boxMat, coreGeo, coreEdges, coreMat)

        group.add(box, core)
        group.rotation.x = 0.42
        scene.add(group)

        const renderFrame = (t, scroll) => {
          group.rotation.y = t * 0.00012 + scroll * 0.0011
          group.rotation.x = 0.42 + scroll * 0.0003
          core.rotation.y = -t * 0.00028 - scroll * 0.0016
          renderer.render(scene, camera)
        }

        if (reduced) {
          renderFrame(5000, 0)
          return
        }

        const loop = t => {
          if (!document.hidden) renderFrame(t, window.pageYOffset)
          raf = window.requestAnimationFrame(loop)
        }
        raf = window.requestAnimationFrame(loop)

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

export default CubeScene
