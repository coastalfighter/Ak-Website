import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function NetworkObject() {
  const group = useRef()
  const reduced = useReducedMotion()
  const points = useMemo(() => {
    const items = []
    for (let i = 0; i < 22; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / 21)
      const theta = Math.sqrt(22 * Math.PI) * phi
      items.push(new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * 1.55,
        Math.sin(theta) * Math.sin(phi) * 1.55,
        Math.cos(phi) * 1.55
      ))
    }
    return items
  }, [])
  const edges = useMemo(() => {
    const lines = []
    points.forEach((a, i) => points.slice(i + 1).forEach(b => {
      if (a.distanceTo(b) < 1.05) lines.push([a, b])
    }))
    return lines
  }, [points])

  useFrame((state, delta) => {
    if (!group.current || reduced) return
    group.current.rotation.y += delta * 0.07
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12
  })

  return <group ref={group}>
    <mesh>
      <icosahedronGeometry args={[1.1, 1]} />
      <meshStandardMaterial color="#10231d" metalness={0.65} roughness={0.24} wireframe />
    </mesh>
    {edges.map((edge, i) => <Line key={i} points={edge} color="#66dca7" transparent opacity={0.34} lineWidth={0.65} />)}
    {points.map((point, i) => <mesh key={i} position={point}>
      <sphereGeometry args={[i % 5 === 0 ? 0.045 : 0.026, 10, 10]} />
      <meshBasicMaterial color={i % 5 === 0 ? '#f3ff95' : '#9df9c8'} />
    </mesh>)}
  </group>
}

export default function HeroScene() {
  return <div className="hero-canvas" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.6]}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 3]} intensity={2.2} color="#b8ffe0" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}><NetworkObject /></Float>
      </Suspense>
    </Canvas>
  </div>
}
