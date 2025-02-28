import { Download, ImagePlus, Palette } from 'lucide-react';
import type * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Customize3DSidebarProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tshirtColor: string;
  setTshirtColor: (color: string) => void;
  exportDesign3D: () => void;
}

export function Customize3DSidebar({
  handleImageUpload,
  tshirtColor,
  exportDesign3D,
  setTshirtColor,
}: Customize3DSidebarProps) {
  return (
    <Card className="w-64 h-full border shadow-md">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg font-medium">Design Tools</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="image-upload" className="text-sm font-medium">
            Upload Image
          </Label>
          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="w-8 h-8 mb-3 text-gray-400" />
                <p className="text-sm text-gray-500">Click to upload</p>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </Label>
          </div>
        </div>

        {/* T-Shirt Color */}
        <div className="space-y-2">
          <Label htmlFor="tshirt-color" className="text-sm font-medium">
            T-Shirt Color
          </Label>
          <div className="flex items-center space-x-2">
            <Palette className="w-6 h-6" style={{ color: tshirtColor }} />
            <Input
              id="tshirt-color"
              type="color"
              value={tshirtColor}
              onChange={(e) => setTshirtColor(e.target.value)}
              className="w-full h-8"
            />
          </div>
        </div>

        {/* Download Button */}
        <Button
          variant="default"
          size="sm"
          className="w-full"
          onClick={exportDesign3D}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Design
        </Button>
      </CardContent>
    </Card>
  );
}
