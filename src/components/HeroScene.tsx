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

const INSIDE_COLOR = new THREE.Color("#99f6e4");
const OUTSIDE_COLOR = new THREE.Color("#0f3d38");

function buildSpiral(count: number, arms: number, spin: number, randomness: number, maxRadius: number) {
  const rng = createRng(2024);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = rng() * maxRadius;
    const armAngle = ((i % arms) / arms) * Math.PI * 2;
    const spinAngle = radius * spin;
    const angle = armAngle + spinAngle;

    const spread = randomness * radius;
    const randX = (rng() - 0.5) * spread;
    const randY = (rng() - 0.5) * spread * 0.3;
    const randZ = (rng() - 0.5) * spread;

    positions[i * 3] = Math.cos(angle) * radius + randX;
    positions[i * 3 + 1] = randY;
    positions[i * 3 + 2] = Math.sin(angle) * radius + randZ;

    const mixed = INSIDE_COLOR.clone().lerp(OUTSIDE_COLOR, radius / maxRadius);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  return { positions, colors };
}

function Spiral({ interactive }: { interactive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => buildSpiral(2200, 4, 1.9, 0.28, 2.3), []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.09;
    }
    if (groupRef.current && interactive) {
      const targetY = state.pointer.x * 0.25;
      const targetX = -0.62 - state.pointer.y * 0.12;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.9, 0]} rotation={[-0.62, 0, 0.08]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroScene({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 7.6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Spiral interactive={interactive} />
    </Canvas>
  );
}
