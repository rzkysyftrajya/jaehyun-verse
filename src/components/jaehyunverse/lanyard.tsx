"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

// Komponen gelang sederhana (placeholder)
function Band() {
  return (
    <mesh>
      <torusGeometry args={[1, 0.3, 32, 64]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function Lanyard({
  position = [0, 0, 5],
  gravity = [0, -9.81, 0],
  fov = 50,
}) {
  return (
    <div
      className="lanyard-wrapper"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999, // selalu di atas
        pointerEvents: "auto", // biar bisa interaksi mouse
      }}
    >
      <Canvas camera={{ position, fov }}>
        {/* Cahaya */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Fisika */}
        <Physics gravity={gravity}>
          <Band />
        </Physics>

        {/* Kontrol interaktif */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        {/* Environment */}
        <Environment blur={0.75}>
          <Lightformer
            intensity={3}
            position={[0, 0, 10]}
            scale={[10, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
