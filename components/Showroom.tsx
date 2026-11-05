"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, PresentationControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Wheel({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0.34, z]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.22, 40]} />
        <meshStandardMaterial color="#111315" roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.118, 0]}>
        <cylinderGeometry args={[0.205, 0.205, 0.025, 32]} />
        <meshStandardMaterial color="#a6aaa9" metalness={0.88} roughness={0.24} />
      </mesh>
      <mesh position={[0, 0.135, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.03, 24]} />
        <meshStandardMaterial color="#252a2d" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Car({ color }: { color: string }) {
  const paint = new THREE.MeshPhysicalMaterial({ color, metalness: 0.68, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12 });
  const glass = new THREE.MeshPhysicalMaterial({ color: "#17212b", metalness: 0.35, roughness: 0.12, transmission: 0.08, transparent: true, opacity: 0.94 });
  const trim = new THREE.MeshStandardMaterial({ color: "#17191b", metalness: 0.5, roughness: 0.36 });
  const lamp = new THREE.MeshStandardMaterial({ color: "#e6f4f4", emissive: "#b3e8f4", emissiveIntensity: 1.3, metalness: 0.3 });

  return (
    <group position={[0, 0.15, 0]}>
      {/* Low, long body */}
      <RoundedBox args={[1.92, 0.4, 3.65]} radius={0.16} smoothness={5} position={[0, 0.53, 0]} castShadow receiveShadow material={paint} />
      <RoundedBox args={[1.78, 0.19, 1.04]} radius={0.09} smoothness={4} position={[0, 0.76, 0.92]} castShadow material={paint} />
      <RoundedBox args={[1.7, 0.18, 0.78]} radius={0.08} smoothness={4} position={[0, 0.72, -1.42]} castShadow material={paint} />
      {/* Cabin and panoramic glazing */}
      <RoundedBox args={[1.43, 0.66, 1.67]} radius={0.2} smoothness={6} position={[0, 0.98, -0.22]} castShadow material={glass} />
      <RoundedBox args={[1.49, 0.11, 1.72]} radius={0.05} smoothness={4} position={[0, 1.27, -0.22]} material={trim} />
      {/* Front grille and light signature */}
      <RoundedBox args={[0.78, 0.19, 0.055]} radius={0.07} smoothness={4} position={[0, 0.42, 1.85]} material={trim} />
      {[-1, 1].map((side) => <group key={side}>
        <RoundedBox args={[0.47, 0.075, 0.045]} radius={0.035} smoothness={4} position={[side * 0.58, 0.67, 1.83]} material={lamp} />
        <RoundedBox args={[0.46, 0.07, 0.04]} radius={0.03} smoothness={4} position={[side * 0.59, 0.55, -1.84]} material={lamp} />
        <Wheel x={side * 0.94} z={0.99} />
        <Wheel x={side * 0.94} z={-1.11} />
      </group>)}
      {/* Mirrors */}
      {[-1, 1].map((side) => <mesh key={`mirror-${side}`} position={[side * 0.83, 0.91, 0.3]} castShadow>
        <sphereGeometry args={[0.105, 18, 14]} />
        <meshStandardMaterial color={color} metalness={0.65} roughness={0.2} />
      </mesh>)}
      {/* Side sill */}
      <RoundedBox args={[0.12, 0.13, 1.55]} radius={0.045} smoothness={4} position={[0.92, 0.36, -0.03]} material={trim} />
      <RoundedBox args={[0.12, 0.13, 1.55]} radius={0.045} smoothness={4} position={[-0.92, 0.36, -0.03]} material={trim} />
    </group>
  );
}

export default function Showroom({ color }: { color: string }) {
  return (
    <Canvas dpr={[1, 1.7]} camera={{ position: [4.6, 2.45, 5.3], fov: 37 }} shadows gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.55} />
      <spotLight position={[2, 7, 3]} angle={0.48} penumbra={0.8} intensity={95} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, -2]} intensity={18} color="#99b9d6" />
      <pointLight position={[3, 1, -3]} intensity={13} color="#f0c89d" />
      <Environment preset="studio" />
      <PresentationControls global snap={{ mass: 2, tension: 150 }} rotation={[0, -0.3, 0]} polar={[-0.14, 0.2]} azimuth={[-0.75, 0.75]} config={{ mass: 2, tension: 170 }}>
        <Float speed={1.1} rotationIntensity={0.025} floatIntensity={0.12}>
          <Car color={color} />
        </Float>
      </PresentationControls>
      <ContactShadows position={[0, 0.005, 0]} opacity={0.48} scale={9} blur={2.8} far={4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#11161b" roughness={0.3} metalness={0.38} />
      </mesh>
    </Canvas>
  );
}
