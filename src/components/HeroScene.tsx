"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic PRNG (mulberry32) so particle placement is pure and stable across renders.
function createRng(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildParticlePositions(count: number) {
  const rng = createRng(1337);
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 2.6 + rng() * 1.6;
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(2 * rng() - 1);
    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi);
  }
  return arr;
}

function ParticleField({ count = 600 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => buildParticlePositions(count), [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#5eead4" size={0.028} transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

function WireSphere({
  radius,
  detail,
  color,
  opacity,
  speed,
}: {
  radius: number;
  detail: number;
  color: string;
  opacity: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * speed;
    meshRef.current.rotation.x += delta * speed * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[radius, detail]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

function Scene({ parallax }: { parallax: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !parallax) return;
    const targetY = state.pointer.x * 0.35;
    const targetX = -state.pointer.y * 0.25;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <WireSphere radius={2.5} detail={2} color="#2dd4bf" opacity={0.32} speed={0.06} />
      <WireSphere radius={1.5} detail={1} color="#5eead4" opacity={0.22} speed={-0.09} />
      <ParticleField />
    </group>
  );
}

export default function HeroScene({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene parallax={interactive} />
    </Canvas>
  );
}
