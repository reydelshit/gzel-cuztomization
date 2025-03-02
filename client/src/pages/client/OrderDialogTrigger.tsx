import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import OrderDialog from './OrderDialog';

export function OrderDialogTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Place Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <OrderDialog />
      </DialogContent>
    </Dialog>
  );
}
