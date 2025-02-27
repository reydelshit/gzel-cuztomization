import { useRef, useState } from 'react';
import * as fabric from 'fabric';
import { DEFAULT_TEXTURE } from '@/pages/admin/3DCanvas';

const patterns = [
  { name: 'Stripes', src: '/pattern1.avif' },
  { name: 'Polka Dots', src: '/pattern2.avif' },
];

const useThreeDTShirt = () => {
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

  // Export design as an image
  const exportDesign3D = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const imageURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'custom-tshirt.png';
    link.click();
  };
  return {
    handleImageUpload,
    tshirtColor,
    setTshirtColor,
    exportDesign3D,
    uploadedTexture,
  };
};

export default useThreeDTShirt;
