import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei";
import { Fragment, useRef } from "react"
import * as THREE from 'three';

export const SampleCanvas = () => {
    const Box = () => {
        const meshRef = useRef<THREE.Mesh>(null!);

        // Scene
        const scene = new THREE.Scene();

        // Object
        const geometry = new THREE.BoxGeometry(5,5,5);
        const meterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, meterial);
        scene.add(mesh);

        const sizes = {
            width: 300,
            height: 400
        }

        const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height);

        scene.add(camera);

        useFrame(() => {
            if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
            }
        });
        return (
            <mesh ref={meshRef}>
                <boxGeometry args={[3, 3, 3]} />
                <meshPhongMaterial color="lightblue" />
            </mesh>
        );
    }

    return (
        <Fragment>
            <div id="canvas-container" className="bg-base-150">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box />
                </Canvas>
            </div>
        </Fragment>
    )
}