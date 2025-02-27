import type * as React from 'react';
import { Download, Pencil, Type } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const Customize2DSideBar = ({
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
  setSelectedFont,
  selectedFont,
}: {
  patterns: { name: string; src: string }[];
  addPattern: (src: string) => void;
  addText: () => void;
  toggleDrawingMode: () => void;
  isDrawing: boolean;
  brushColor: string;
  handleBrushColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brushSize: number;
  handleBrushSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  exportDesign: () => void;
  setSelectedFont: (font: string) => void;
  selectedFont: string;
}) => {
  return (
    <Card className="w-56 h-[90%] border shadow-md">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg font-medium">Design Tools</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col space-y-4 p-4">
          {/* Patterns Section */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <div className="w-4 h-4 rounded-full bg-primary/20 mr-2 flex items-center justify-center">
                <span className="text-xs text-primary">1</span>
              </div>
              Patterns
            </h3>
            <ScrollArea className="h-48 rounded-md border">
              <div className="grid grid-cols-2 gap-2 p-2">
                {patterns.map((pattern, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => addPattern(pattern.src)}
                  >
                    <div className="relative overflow-hidden rounded-md border border-border hover:border-primary transition-colors">
                      <img
                        src={pattern.src || '/placeholder.svg'}
                        alt={pattern.name}
                        className="h-16 w-16 object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-xs mt-1 text-center truncate w-full">
                      {pattern.name}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          {/* Text Section */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <div className="w-4 h-4 rounded-full bg-primary/20 mr-2 flex items-center justify-center">
                <span className="text-xs text-primary">2</span>
              </div>
              Text
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={addText}
              >
                <Type className="mr-2 h-4 w-4" />
                Add Text
              </Button>
              <div className="space-y-1">
                <Label htmlFor="font-select" className="text-xs">
                  Font Family
                </Label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger id="font-select" className="h-8">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'Arial',
                      'Courier New',
                      'Georgia',
                      'Impact',
                      'Verdana',
                    ].map((font) => (
                      <SelectItem key={font} value={font}>
                        <span style={{ fontFamily: font }}>{font}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Drawing Section */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <div className="w-4 h-4 rounded-full bg-primary/20 mr-2 flex items-center justify-center">
                <span className="text-xs text-primary">3</span>
              </div>
              Drawing
            </h3>
            <div className="space-y-3">
              <Button
                variant={isDrawing ? 'default' : 'outline'}
                size="sm"
                className="w-full justify-start"
                onClick={toggleDrawingMode}
              >
                <Pencil className="mr-2 h-4 w-4" />
                {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
              </Button>

              <div className="space-y-1">
                <Label htmlFor="brush-color" className="text-xs">
                  Brush Color
                </Label>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: brushColor }}
                  />
                  <Input
                    id="brush-color"
                    type="color"
                    value={brushColor}
                    onChange={handleBrushColorChange}
                    className="w-full h-8"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="brush-size" className="text-xs">
                  Brush Size
                </Label>
                <Select
                  value={brushSize.toString()}
                  onValueChange={(value) =>
                    handleBrushSizeChange({ target: { value } } as any)
                  }
                >
                  <SelectTrigger id="brush-size" className="h-8">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}px
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Download Section */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <div className="w-4 h-4 rounded-full bg-primary/20 mr-2 flex items-center justify-center">
                <span className="text-xs text-primary">4</span>
              </div>
              Export
            </h3>
            <Button
              variant="default"
              size="sm"
              className="w-full"
              onClick={exportDesign}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Design
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Customize2DSideBar;
