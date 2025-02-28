import { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

export function SaveDesignDialog({
  canvasRef,
  saveDesignID,
  isForUpdate,
  designNameUpdate,
}: {
  canvasRef: React.RefObject<any>;
  saveDesignID: string | undefined;
  isForUpdate?: boolean;
  designNameUpdate: string;
}) {
  const [designName, setDesignName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isForUpdate) {
      setDesignName(designNameUpdate || '');
    }
  }, [isForUpdate, designNameUpdate]);

  const handleSaveOrUpdateDesign = async (saveDesignID?: string) => {
    if (!canvasRef.current) return;

    try {
      setIsLoading(true);

      // Convert canvas to image
      const dataURL = canvasRef.current.toDataURL('image/png');
      const blob = await (await fetch(dataURL)).blob();
      const designJSON = JSON.stringify(canvasRef.current.toJSON());

      // Create form data
      const formData = new FormData();
      formData.append('designName', designName);
      formData.append(
        'design_image',
        blob,
        `${designName || 'custom-tshirt'}.png`,
      );
      formData.append('designData', designJSON);

      // Debugging: Log form data
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      let res;
      if (saveDesignID) {
        // Update design
        res = await axios.put(
          `${import.meta.env.VITE_SERVER_LINK}/designs/update/${saveDesignID}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        navigate('/saved-designs');
      } else {
        // Create new design
        res = await axios.post(
          `${import.meta.env.VITE_SERVER_LINK}/designs/create`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
      }

      if (res.data.status === 'success') {
        toast({
          title: saveDesignID ? 'Design Updated' : 'Design Saved',
          description: `Your design has been successfully ${
            saveDesignID ? 'updated' : 'saved'
          }.`,
        });

        // Reset state
        setIsOpen(false);
        setDesignName('');
      }
    } catch (error) {
      console.error('Error saving/updating design:', error);
      toast({
        title: 'Error',
        description: `Failed to ${
          saveDesignID ? 'update' : 'save'
        } the design. Please try again.`,
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
          <Button
            onClick={() =>
              handleSaveOrUpdateDesign(
                isForUpdate ? saveDesignID?.toString() : undefined,
              )
            }
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
