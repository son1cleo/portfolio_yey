"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic PRNG (mulberry32) so node placement is pure and stable across renders.
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

// Build a plexus: nodes distributed in an annulus (open center) plus the line
// segments connecting nearby nodes into a triangulated web.
function buildPlexus(
  nodeCount: number,
  rInner: number,
  rOuter: number,
  thickness: number,
  linkDist: number,
  maxLinks: number
) {
  const rng = createRng(7);
  const nodes: THREE.Vector3[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const theta = rng() * Math.PI * 2;
    const r = rInner + rng() * (rOuter - rInner);
    const nx = (rng() - 0.5) * thickness;
    const ny = (rng() - 0.5) * thickness;
    const nz = (rng() - 0.5) * thickness * 1.6;
    const x = Math.cos(theta) * r + nx;
    const y = Math.sin(theta) * r + ny;
    const z = nz + Math.sin(theta * 2) * 0.5;
    nodes.push(new THREE.Vector3(x, y, z));
  }

  const nodePositions = new Float32Array(nodeCount * 3);
  nodes.forEach((v, i) => {
    nodePositions[i * 3] = v.x;
    nodePositions[i * 3 + 1] = v.y;
    nodePositions[i * 3 + 2] = v.z;
  });

  const linePts: number[] = [];
  const linkCount = new Array(nodeCount).fill(0);
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (linkCount[i] >= maxLinks || linkCount[j] >= maxLinks) continue;
      if (nodes[i].distanceTo(nodes[j]) < linkDist) {
        linePts.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        linkCount[i]++;
        linkCount[j]++;
      }
    }
  }

  return { nodePositions, linePositions: new Float32Array(linePts) };
}

function Plexus({ interactive }: { interactive: boolean }) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  const { nodePositions, linePositions } = useMemo(
    () => buildPlexus(340, 1.7, 3.6, 0.7, 0.92, 5),
    []
  );

  useFrame((state, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.z += delta * 0.04;
    }
    if (outerRef.current && interactive) {
      const targetX = -0.5 - state.pointer.y * 0.12;
      const targetY = state.pointer.x * 0.18;
      outerRef.current.rotation.x += (targetX - outerRef.current.rotation.x) * 0.03;
      outerRef.current.rotation.y += (targetY - outerRef.current.rotation.y) * 0.03;
    }
  });

  return (
    <group ref={outerRef} rotation={[-0.5, 0, 0]}>
      <group ref={innerRef} scale={[1.55, 1, 1]}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#2dd4bf"
            transparent
            opacity={0.2}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#5eead4"
            size={0.055}
            sizeAttenuation
            transparent
            opacity={0.9}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}

export default function HeroScene({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Plexus interactive={interactive} />
    </Canvas>
  );
}
