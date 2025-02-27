import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { StallsTypes } from '@/types';
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const RemoveDialog = ({
  stall,
  fetchStalls,
}: {
  stall: StallsTypes;
  fetchStalls: () => void;
}) => {
  const handleRemove = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_LINK}/api/tenants/delete/${
          stall.tenants_id
        }`,
      );

      if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'Stall has been removed',
        });

        fetchStalls();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-500 hover:bg-red-400">
          <Trash size={15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the
            record. Please proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
