import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export const DEFAULT_TEXTURE = '/default-texture.png';
const TSHIRT_MODEL = '/tshirt.glb';

const TShirt = ({
  texture,
  color,
  scale,
}: {
  texture: string;
  color: string;
  scale: number;
}) => {
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
        material.color.set(0xffffff);
      } else {
        material.map = null;
        material.color.set(color);
      }

      material.needsUpdate = true;
    }
  });

  return <primitive object={scene} scale={scale} position={[0, -4, 0]} />;
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

      gl.render(scene, camera);

      requestAnimationFrame(() => {
        const dataURL = gl.domElement.toDataURL('image/png');

        console.log('Generated 3D image data URL:', dataURL);
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
  isOnPreview,
  uploadedTexture,
  tshirtColor,
  setExportDesign3D,
}: {
  uploadedTexture: string;
  tshirtColor: string;
  setExportDesign3D: React.Dispatch<React.SetStateAction<() => void>>;
  isOnPreview: boolean;
}) => {
  // const userRole = localStorage.getItem('userRole');
  const scaleValue = isOnPreview ? 0.15 : 0.1;

  return (
    <div className="flex justify-center items-center flex-col w-full min-h-[80vh">
      <div className=" w-full h-[750px] ">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <TShirt
            texture={uploadedTexture}
            color={tshirtColor}
            scale={scaleValue}
          />
          <OrbitControls />
          <CaptureHelper setExportFunction={setExportDesign3D} />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDCanvas;
