// import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { Fragment, Suspense, useRef, type JSX } from "react";
import * as THREE from "three";

export const ImagePlane = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  // Optional: rotation animation or effect
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    // <Canvas camera={{ position: [0, 0, 10] }}>
    //   <ambientLight />
    //     <planeGeometry args={[5, 3]} />
        <meshBasicMaterial map={texture} />
    // </Canvas>
  );
};