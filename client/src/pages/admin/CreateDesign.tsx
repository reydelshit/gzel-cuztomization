import * as fabric from 'fabric';
import { useEffect, useRef, useState } from 'react';

import pattern1 from '@/assets/pattern1.avif';
// import pattern2 from '@/assets/pattern2.avif';

import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

import { Customize3DSidebar } from '../components/Customize3DSidebar';
import ThreeDCanvas, { DEFAULT_TEXTURE } from './3DCanvas';
import Customize2DSideBar from '../components/Customize2DSideBar';
import TShirtSelection from '../components/TShirtSelection';
import { SaveDesignDialog } from '../components/DialogSaveDesign2D';
import { useThree } from '@react-three/fiber';
import OrderDialog from '../client/OrderDialog';
import { OrderDialogTrigger } from '../client/OrderDialogTrigger';

const patterns = [
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern1 },
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern1 },
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern1 },
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern1 },
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern1 },
];

const CreateDesign: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const savedCanvasDataRef = useRef<string | null>(null);
  const [switchCanvas, setSwitchCanvas] = useState(false);
  const [isForUpdate, setIsForUpdate] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedTShirt = params.get('tshirt') || '';
  const designData = params.get('design');
  const saveDesignID = params.get('saveDesignID') || '';
  const designName = params.get('designName') || '';

  const [selectedFont, setSelectedFont] = useState('Arial');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    if (switchCanvas) return;

    const canvasElement = document.getElementById(
      'tshirt-canvas',
    ) as HTMLCanvasElement;
    if (!canvasElement) return;

    if (!canvasRef.current) {
      canvasRef.current = new fabric.Canvas(canvasElement, {
        width: 1200,
        height: 900,
        backgroundColor: '#fef6f0',
      });
    }

    const canvas = canvasRef.current;

    // Restore the design if designData exists
    if (designData) {
      try {
        const parsedDesign = JSON.parse(decodeURIComponent(designData));

        canvas.loadFromJSON(parsedDesign, () => {
          canvas.renderAll();
        });
      } catch (error) {
        console.error('Error loading design:', error);
      }

      setIsForUpdate(true);
    } else if (savedCanvasDataRef.current) {
      canvas.loadFromJSON(savedCanvasDataRef.current, () => {
        canvas.renderAll();
      });
    } else if (selectedTShirt) {
      // Reload the T-shirt image if no saved state
      fabric.Image.fromURL(selectedTShirt).then((img) => {
        if (!canvas) return;

        const canvasWidth = canvas.width!;
        const canvasHeight = canvas.height!;
        const scale =
          Math.min(canvasWidth / img.width!, canvasHeight / img.height!) * 0.8;

        img.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: 'center',
          originY: 'center',
          scaleX: scale,
          scaleY: scale,
          selectable: false,
          evented: false,
        });

        canvas.clear();
        canvas.add(img);

        // @ts-ignore
        img.sendToBack();
        canvas.renderAll(); // Force refresh
      });
    }

    setTimeout(() => {
      canvas.renderAll();
    }, 100);

    // Handle delete key event
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && canvasRef.current) {
        const activeObject = canvasRef.current.getActiveObject();
        if (activeObject) {
          canvasRef.current.remove(activeObject);
          canvasRef.current.renderAll();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (!switchCanvas && canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, [selectedTShirt, switchCanvas, designData]);

  const addPattern = (patternSrc: string) => {
    console.log(patternSrc, 'first'); //working

    if (!canvasRef.current) return;
    fabric.Image.fromURL(patternSrc).then((img) => {
      if (!canvasRef.current) return;

      console.log(patternSrc, 'second'); //not working

      img.set({
        left: 300,
        top: 300,
        scaleX: 0.5,
        scaleY: 0.5,
        selectable: true,
        cornerStyle: 'circle',
        transparentCorners: false,
        borderColor: 'red',
      });

      canvasRef.current.add(img);
      canvasRef.current.setActiveObject(img);
    });
  };

  const addText = () => {
    console.log('Adding text...');

    if (!canvasRef.current) return;
    const text = new fabric.Textbox('Your Design', {
      left: 150,
      top: 250,
      fontSize: 30,
      fill: 'black',
      fontFamily: selectedFont,
      selectable: true,
    });
    canvasRef.current.add(text);
    canvasRef.current.setActiveObject(text);
  };

  const exportDesign = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL({
      format: 'png',
      multiplier: 1,
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'custom-tshirt.png';
    link.click();
  };

  const toggleDrawingMode = () => {
    if (isDrawing) {
      if (canvasRef.current) {
        canvasRef.current.isDrawingMode = false;
      }
    } else {
      canvasRef.current?.set({
        isDrawingMode: true,
        freeDrawingBrush: new fabric.PencilBrush(canvasRef.current),
      });
      // Set brush properties
      if (canvasRef.current && canvasRef.current.freeDrawingBrush) {
        canvasRef.current.freeDrawingBrush.color = brushColor;
        canvasRef.current.freeDrawingBrush.width = brushSize;
      }
    }
    setIsDrawing(!isDrawing);
  };

  const handleBrushColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBrushColor(event.target.value);
    if (canvasRef.current && canvasRef.current.isDrawingMode) {
      if (canvasRef.current.freeDrawingBrush) {
        canvasRef.current.freeDrawingBrush.color = event.target.value;
      }
    }
  };

  const handleBrushSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const size = parseInt(event.target.value, 10);
    setBrushSize(size);
    if (canvasRef.current && canvasRef.current.isDrawingMode) {
      if (canvasRef.current.freeDrawingBrush) {
        canvasRef.current.freeDrawingBrush.width = size;
      }
    }
  };

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvasRef.current) return;
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      fabric.Image.fromURL(imageUrl).then((img) => {
        if (!canvasRef.current) return;

        img.set({
          left: 300,
          top: 300,
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: true,
          cornerStyle: 'circle',
          transparentCorners: false,
          borderColor: 'red',
        });

        canvasRef.current.add(img);
        canvasRef.current.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  //   3D CANVAS

  const [uploadedTexture, setUploadedTexture] =
    useState<string>(DEFAULT_TEXTURE);
  const [tshirtColor, setTshirtColor] = useState<string>('white');

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setUploadedTexture(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const [exportDesign3D, setExportDesign3D] = useState<() => void>(() => {});

  return (
    <div className="flex flex-row-reverse ">
      {selectedTShirt ? (
        <>
          {' '}
          <div>
            <Button
              onClick={() => {
                if (!switchCanvas && canvasRef.current) {
                  savedCanvasDataRef.current = JSON.stringify(
                    canvasRef.current.toJSON(),
                  );

                  canvasRef.current.dispose();
                  canvasRef.current = null;
                }

                setSwitchCanvas(!switchCanvas);

                setTimeout(() => {
                  if (!switchCanvas && canvasRef.current) {
                    canvasRef.current.renderAll();
                  }
                }, 100);
              }}
              className="my-2 w-full"
            >
              {switchCanvas ? 'Switch to 2D' : 'Switch to 3D'}
            </Button>

            {switchCanvas ? (
              <Customize3DSidebar
                handleImageUpload={handleImageUpload}
                tshirtColor={tshirtColor}
                setTshirtColor={setTshirtColor}
                exportDesign3D={exportDesign3D}
              />
            ) : (
              <Customize2DSideBar
                addImage={addImage}
                patterns={patterns}
                addPattern={addPattern}
                addText={addText}
                toggleDrawingMode={toggleDrawingMode}
                isDrawing={isDrawing}
                brushColor={brushColor}
                handleBrushColorChange={handleBrushColorChange}
                brushSize={brushSize}
                handleBrushSizeChange={handleBrushSizeChange}
                exportDesign={exportDesign}
                setSelectedFont={setSelectedFont}
                selectedFont={selectedFont}
              />
            )}
          </div>
          {switchCanvas ? (
            <div className="flex justify-center items-center h-screen w-full">
              <ThreeDCanvas
                setExportDesign3D={setExportDesign3D}
                uploadedTexture={uploadedTexture}
                tshirtColor={tshirtColor}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen w-full relative">
              <div className="absolute top-5 left-5 z-40">
                <header className="flex h-[4rem] items-center justify-between px-6">
                  <h1 className="text-2xl font-bold text-black uppercase italic">
                    Customize your T-shirt
                  </h1>
                </header>
                <SaveDesignDialog
                  saveDesignID={saveDesignID}
                  isForUpdate={isForUpdate}
                  canvasRef={canvasRef}
                  designNameUpdate={designName}
                />

                <OrderDialogTrigger />
              </div>
              <canvas id="tshirt-canvas"></canvas>
            </div>
          )}
        </>
      ) : (
        <>
          {' '}
          <div className="w-full flex flex-col gap-8 p-8">
            <div className=" py-16">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Start your Design now!
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Create your unique custom t-shirt design with our
                    easy-to-use tool. Choose from our premium quality shirts and
                    bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>
            <TShirtSelection />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateDesign;
