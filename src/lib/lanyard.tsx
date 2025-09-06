"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

// 🎯 Komponen utama Lanyard (panggung 3D)
export function Lanyard({
  children,
  interactive = true,
}: {
  children?: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Cahaya dasar */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Fisika */}
      <Physics>{children && <group>{children}</group>}</Physics>

      {/* Kontrol drag / orbit */}
      {interactive && <OrbitControls />}
    </Canvas>
  );
}

// 🎯 Kartu gantung (dummy contoh, nanti bisa dikustomisasi)
export function LanyardCard() {
  return (
    <RigidBody colliders="cuboid">
      <mesh>
        <boxGeometry args={[1, 1.5, 0.05]} />
        <meshStandardMaterial color={"#ff4d6d"} />
      </mesh>
    </RigidBody>
  );
}

// 🎯 Judul di atas kartu
export function LanyardCardTitle({ text }: { text: string }) {
  return (
    <mesh position={[0, 1, 0]}>
      <textGeometry args={[text, { size: 0.2, height: 0.02 }]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

// 🎯 Deskripsi di bawah judul
export function LanyardCardDescription({ text }: { text: string }) {
  return (
    <mesh position={[0, -1, 0]}>
      <textGeometry args={[text, { size: 0.1, height: 0.01 }]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
}
