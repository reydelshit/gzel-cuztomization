import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const TSHIRT_MODEL = '/actor.glb';

const TShirtModel = () => {
  const { scene } = useGLTF(TSHIRT_MODEL);
  return <primitive object={scene} scale={5} position={[0, -4, 0]} />;
};

const PreviewShirt = () => {
  return (
    <div className="w-full">
      <header className="flex h-[4rem] items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-black uppercase italic">
          Preview Design
        </h1>
      </header>
      <div className="h-screen flex justify-center items-center w-full ">
        <Canvas camera={{ position: [0, 0, 11] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <TShirtModel />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default PreviewShirt;
