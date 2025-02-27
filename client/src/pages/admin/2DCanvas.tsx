import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

const TShirtCanvas = ({ selectedTShirt }: { selectedTShirt: string }) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
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

    if (selectedTShirt) {
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

        canvas.clear(); // Ensure only one image is loaded
        canvas.add(img);

        // @ts-ignore
        img.sendToBack(); // Corrected method usage
      });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && canvas) {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
          canvas.renderAll();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, [selectedTShirt]);

  return (
    <div className="flex justify-center items-center h-screen">
      <canvas id="tshirt-canvas"></canvas>
    </div>
  );
};

export default TShirtCanvas;
