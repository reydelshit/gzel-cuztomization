import { Button } from '@/components/ui/button';
import React from 'react';

interface ImageDownloadButtonProps {
  imageUrl: string;
  filename: string;
  isAbsolute?: boolean;
}

const ImageDownloadButton: React.FC<ImageDownloadButtonProps> = ({
  imageUrl,
  filename,
  isAbsolute = true,
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename + '.png';
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="secondary"
      size="sm"
      className={`${isAbsolute ? 'absolute bottom-3 left-3 gap-1.5' : 'gap-1'}`}
    >
      Download Image
    </Button>
  );
};

export default ImageDownloadButton;
