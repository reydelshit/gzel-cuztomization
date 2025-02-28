import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export function SaveDesignDialog({
  canvasRef,
}: {
  canvasRef: React.RefObject<any>;
}) {
  const [designName, setDesignName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveDesign = async () => {
    if (!canvasRef.current) return;

    // Convert canvas to PNG data URL
    const dataURL = canvasRef.current.toDataURL('image/png');

    // Convert Base64 to Blob
    const blob = await (await fetch(dataURL)).blob();
    const formData = new FormData();
    formData.append('designName', designName);
    formData.append(
      'design_image',
      blob,
      `${designName || 'custom-tshirt'}.png`,
    );

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/designs/create`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      if (res.data.status === 'success') {
        toast({
          title: 'Design Saved',
          description: 'Your design has been successfully saved.',
        });

        // Close modal
        setIsOpen(false);
        setDesignName('');
      }
    } catch (error) {
      console.error('Error saving design:', error);
      toast({
        title: 'Error',
        description: 'Failed to save the design. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="absolute top-5 left-5 z-40" asChild>
        <Button>Save Design</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Design</DialogTitle>
          <DialogDescription>
            Enter a name for your design and click "Save" to store it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="designName" className="text-right">
              Name
            </Label>
            <Input
              id="designName"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="Enter design name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveDesign} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
