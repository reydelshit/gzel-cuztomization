import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { StallsTypes } from '@/types';

const RenewDialog = ({
  stall,
  fetchStalls,
}: {
  stall: StallsTypes;
  fetchStalls: () => void;
}) => {
  const [selectedLeaseDurationRenew, setSelectedLeaseDurationRenew] =
    useState<string>('');

  return (
    <Dialog>
      <DialogTrigger
        className={`${
          stall.total_amount_to_pay !== 0 && 'cursor-not-allowed'
        } "`}
        disabled={stall.total_amount_to_pay === 0 ? false : true}
      >
        Renew
      </DialogTrigger>
      <DialogContent className="w-[40%]">
        <DialogHeader>
          <DialogTitle>
            Renew payment for business {stall.business_name}
          </DialogTitle>
          <DialogDescription>Owner Name: {stall.name}</DialogDescription>
        </DialogHeader>

        <div className="w-full">
          <Label>Lease Duration</Label>
          <Select
            onValueChange={(value) => setSelectedLeaseDurationRenew(value)}
          >
            <SelectTrigger className="w-full h-[3rem]">
              <SelectValue placeholder="Select lease duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3 months">3 months</SelectItem>
              <SelectItem value="6 months">6 months</SelectItem>
              <SelectItem value="9 months">9 months</SelectItem>
              <SelectItem value="1 year">1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label>Total Payment</Label>
          <Input
            className="h-[3rem] "
            type="number"
            name="total_payment"
            readOnly
            // onChange={(e) => setTotalPayment(+e.target.value)}
            value={
              selectedLeaseDurationRenew.length > 0
                ? selectedLeaseDurationRenew === '3 months'
                  ? 8000 * 3
                  : selectedLeaseDurationRenew === '6 months'
                  ? 8000 * 6
                  : selectedLeaseDurationRenew === '9 months'
                  ? 8000 * 9
                  : 8000 * 12
                : 0
            }
          />

          <DialogClose>
            <Button
              onClick={async () => {
                try {
                  const response = await axios.put(
                    `${import.meta.env.VITE_SERVER_LINK}/api/misc/update/${
                      stall.tenants_id
                    }`,
                    {
                      lease_duration: selectedLeaseDurationRenew,
                    },
                  );

                  console.log(response);
                  if (response.status === 200) {
                    toast({
                      title: 'Lease renewed successfully',
                      description: 'You have successfully renewed the lease',
                    });
                    fetchStalls();
                  }
                } catch (error) {
                  console.error(error);
                  toast({
                    title: 'Failed to renew lease',
                    description: 'An error occurred while renewing the lease',
                  });
                }
              }}
              className="my-4"
            >
              Submit
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenewDialog;
