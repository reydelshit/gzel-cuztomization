import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type TShirtProps = {
  texture: string;
  color: string;
};

export const DEFAULT_TEXTURE = '/default-texture.png'; // Default T-shirt texture
const TSHIRT_MODEL = '/tshirt.glb'; // 3D model path

const TShirt = ({ texture, color }: { texture: string; color: string }) => {
  const { scene } = useGLTF(TSHIRT_MODEL);
  const [loadedTexture, setLoadedTexture] = useState<THREE.Texture | null>(
    null,
  );

  useEffect(() => {
    if (texture && texture !== DEFAULT_TEXTURE) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(texture, (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
        setLoadedTexture(tex);
      });
    } else {
      setLoadedTexture(null);
    }
  }, [texture]);

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;

      if (loadedTexture) {
        material.map = loadedTexture;
        material.color.set(0xffffff); // Keep original texture colors
      } else {
        material.map = null;
        material.color.set(color); // Apply solid color when no texture
      }

      material.needsUpdate = true;
    }
  });

  return <primitive object={scene} scale={0.1} />;
};

export interface ThreeDCanvasProps {
  uploadedTexture: string;
  tshirtColor: string;
  setExportDesign3D: React.Dispatch<React.SetStateAction<() => void>>;
}

const CaptureHelper = ({
  setExportFunction,
}: {
  setExportFunction: (fn: () => void) => void;
}) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    setExportFunction(() => () => {
      console.log('Exporting 3D design...');

      // Ensure render completes before capturing
      gl.render(scene, camera);

      // Use requestAnimationFrame to ensure it's rendered before capturing
      requestAnimationFrame(() => {
        const dataURL = gl.domElement.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'tshirt-design.png';
        link.click();
      });
    });
  }, [gl, scene, camera]);

  return null;
};

const ThreeDCanvas = ({
  uploadedTexture,
  tshirtColor,
  setExportDesign3D,
}: {
  uploadedTexture: string;
  tshirtColor: string;
  setExportDesign3D: React.Dispatch<React.SetStateAction<() => void>>;
}) => {
  return (
    <div className="h-screen flex justify-center items-center flex-col w-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <TShirt texture={uploadedTexture} color={tshirtColor} />
        <OrbitControls />
        <CaptureHelper setExportFunction={setExportDesign3D} />
      </Canvas>
    </div>
  );
};

export default ThreeDCanvas;
