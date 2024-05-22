//@ts-nocheck
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const size = 50;
const divisions = 50;
const halfsize = size / 2;
const vertices = new Float32Array((divisions + 1) * 12).map((v, i) => {
  const step = -halfsize + (Math.trunc(i / 12) * size) / divisions;
  switch (i % 12) {
    case 0:
      return -halfsize;
    case 1:
      return 0;
    case 2:
      return step;
    case 3:
      return halfsize;
    case 4:
      return 0;
    case 5:
      return step;
    case 6:
      return step;
    case 7:
      return 0;
    case 8:
      return -halfsize;
    case 9:
      return step;
    case 10:
      return 0;
    case 11:
      return halfsize;
    default:
      return null;
  }
});

const Obj = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.z =
        ((meshRef.current.position.z + 0.05) % 2) - 20;
      meshRef.current.position.y = -2;
      meshRef.current.rotation.y = 0; //Math.PI / 4
      meshRef.current.rotation.x = 0; //Math.PI / 8
      meshRef.current.rotation.z = 0; //Math.PI / 4
    }
  });

  return (
    <group ref={meshRef}>
      <lineSegments>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={vertices.length / 3}
            array={vertices}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#FF64D8" />
      </lineSegments>
    </group>
  );
};
const SynthwaveScene = () => (
  <Canvas>
    <Obj />
  </Canvas>
);

export default SynthwaveScene;