import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type TShirtProps = {
  texture: string;
  color: string;
};

export const DEFAULT_TEXTURE = '/default-texture.png'; // Default T-shirt texture
const TSHIRT_MODEL = '/tshirt.glb'; // 3D model path

const TShirt: React.FC<TShirtProps> = ({ texture, color }) => {
  const { scene } = useGLTF(TSHIRT_MODEL);
  const loadedTexture = new THREE.TextureLoader().load(texture);

  loadedTexture.wrapS = THREE.RepeatWrapping; // Allow texture to wrap horizontally
  loadedTexture.wrapT = THREE.RepeatWrapping; // Allow texture to wrap vertically
  loadedTexture.repeat.set(1, 1); // Ensure texture fits correctly

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;

      if (texture === DEFAULT_TEXTURE) {
        material.color.set(color); // Solid color
        material.map = null;
      } else {
        material.map = loadedTexture;
        material.color.set(0xffffff); // Keep the texture color neutral
      }

      material.needsUpdate = true;
    }
  });

  return <primitive object={scene} scale={0.1} />;
};

type ThreeDCanvasProps = {
  uploadedTexture: string;
  tshirtColor: string;
};

const ThreeDCanvas: React.FC<ThreeDCanvasProps> = ({
  uploadedTexture,
  tshirtColor,
}) => {
  return (
    <div className="h-screen flex justify-center items-center flex-col w-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <TShirt texture={uploadedTexture} color={tshirtColor} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeDCanvas;
