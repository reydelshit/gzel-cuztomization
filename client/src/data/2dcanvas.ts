import { useRef } from 'react';
import * as fabric from 'fabric';

const canvasRef = useRef<fabric.Canvas | null>(null);

export const addPattern = (patternSrc: string) => {
  if (!canvasRef.current) return;
  fabric.Image.fromURL(patternSrc).then((img) => {
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
