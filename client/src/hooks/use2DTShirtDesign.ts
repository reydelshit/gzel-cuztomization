import { useRef, useState } from 'react';
import * as fabric from 'fabric';

import {
  default as pattern1,
  default as pattern2,
} from '@/assets/pattern1.avif';

const patterns = [
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern2 },
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern2 },
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern2 },
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern2 },
  { name: 'Stripes', src: pattern1 },
  { name: 'Polka Dots', src: pattern2 },
];

const useTShirtDesign = (selectedTShirt: string) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);

  const addPattern = (patternSrc: string) => {
    if (!canvasRef.current) return;
    fabric.Image.fromURL(patternSrc).then((img) => {
      img.set({
        left: 300,
        top: 300,
        scaleX: 0.5,
        scaleY: 0.5,
        selectable: true,
      });
      canvasRef.current?.add(img);
      canvasRef.current?.setActiveObject(img);
    });
  };

  const addText = () => {
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
    if (!canvasRef.current) return;
    canvasRef.current.isDrawingMode = !isDrawing;
    if (isDrawing) {
      if (canvasRef.current.freeDrawingBrush) {
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
    if (canvasRef.current?.freeDrawingBrush) {
      canvasRef.current.freeDrawingBrush.color = event.target.value;
    }
  };

  const handleBrushSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const size = parseInt(event.target.value, 10);
    setBrushSize(size);
    if (canvasRef.current?.freeDrawingBrush) {
      canvasRef.current.freeDrawingBrush.width = size;
    }
  };

  return {
    patterns,
    addPattern,
    addText,
    toggleDrawingMode,
    isDrawing,
    brushColor,
    handleBrushColorChange,
    brushSize,
    handleBrushSizeChange,
    exportDesign,
    selectedFont,
    setSelectedFont,
  };
};

export default useTShirtDesign;
