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
import { toast } from '@/hooks/use-toast';
import { StallsTypes } from '@/types';
import axios from 'axios';

const MarkOverdueDialog = ({
  stall,
  fetchStalls,
}: {
  stall: StallsTypes;
  fetchStalls: () => void;
}) => {
  const handleMarkOverdue = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_LINK}/api/misc/mark-overdue/${
          stall.tenants_id
        }`,
      );

      fetchStalls();
      toast({
        title: 'Tenant marked as overdue',
        description: 'You have successfully marked the tenant as overdue',
      });
      console.log(res.data, 'stalls');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>Mark Overdue</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to Mark Overdue ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently mark the record
            as overdue. Please proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleMarkOverdue}>
            Mark Overdue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MarkOverdueDialog;
