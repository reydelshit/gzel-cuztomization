import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { StallsTypes } from '@/types';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { usePrintPDF } from '../PrintPDF';
const PayDialog = ({
  stall,
  fetchStalls,
}: {
  stall: StallsTypes;
  fetchStalls: () => void;
}) => {
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [currentAmountBalance, setCurrentAmountBalance] = useState<number>(0);
  const [tenantID, setTenantID] = useState<number>(0);
  const generatePDF = usePrintPDF<Record<string, string>>();

  const handleAddPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/api/payments/create`,
        {
          current_balance: currentAmountBalance - totalPayment,
          amount_pay: totalPayment,
          tenants_id: tenantID,
        },
      );

      toast({
        title: 'Payment added successfully',
        description: 'You have successfully added a payment',
      });

      const paymentPrintDetails: Record<string, string> = {
        businessName: stall.business_name,
        owner: stall.name,
        amount: totalPayment.toString(),
        currentBalance: currentAmountBalance.toString(),
      };

      generatePDF({
        data: paymentPrintDetails,
        fileName: stall.business_name + '_payment_receipt',
        title: 'Payment Receipt',
        subtitle: 'TUPI MALLENGKE',
        footer: [
          'This is a computer-generated document and it does not require a signature.',
          'This document is valid without an authorized signature.',
        ],
      });

      fetchStalls();

      console.log(res.data, 'stalls');
    } catch (err) {
      console.log(err);
    }
  };

  const calculateLeaseAmount = (leaseDuration: string): number => {
    const monthlyRate = 8000;
    switch (leaseDuration) {
      case '3 months':
        return monthlyRate * 3;
      case '6 months':
        return monthlyRate * 6;
      case '9 months':
        return monthlyRate * 9;
      case '1 year':
      default:
        return monthlyRate * 12;
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          if (stall.lease_duration) {
            setCurrentAmountBalance(calculateLeaseAmount(stall.lease_duration));
          } else {
            setCurrentAmountBalance(0);
          }

          setTenantID(stall.tenants_id);
        }}
      >
        Pay
      </DialogTrigger>
      <DialogContent className="w-[40%]">
        <DialogHeader>
          <DialogTitle>Pay for business {stall.business_name}</DialogTitle>
          <DialogDescription>Owner Name: {stall.name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddPayment}>
          <div className="w-full space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date Section */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Start</Label>
                <span className="block font-bold text-lg">
                  {moment(stall.created_at).format('LL')}
                </span>
              </div>

              {/* Expiration Section */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Expiration</Label>
                <span className="block font-bold text-lg">
                  {(() => {
                    const createdDate = new Date(stall.created_at);

                    switch (stall.lease_duration) {
                      case '1 month':
                        createdDate.setMonth(createdDate.getMonth() + 1);
                        break;
                      case '3 months':
                        createdDate.setMonth(createdDate.getMonth() + 3);
                        break;
                      case '6 months':
                        createdDate.setMonth(createdDate.getMonth() + 6);
                        break;
                      case '1 year':
                      default:
                        createdDate.setFullYear(createdDate.getFullYear() + 1);
                        break;
                    }

                    return createdDate.toLocaleDateString();
                  })()}
                </span>
              </div>

              {/* Current Balance Section */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  Current Amount to Pay
                </Label>
                <span className="block font-bold text-lg text-blue-600">
                  {stall.total_amount_to_pay === 0 ? (
                    <span className="text-green-600">
                      PAID - Open for renewal
                    </span>
                  ) : (
                    stall.total_amount_to_pay
                  )}
                </span>
              </div>

              {/* Total Payment Section */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  Total Current Payment
                </Label>
                <span className="block font-bold text-lg">
                  {stall.current_total_payments}
                </span>
              </div>
            </div>

            <Label>Enter Amount</Label>
            <Input
              className="h-[3rem]"
              type="number"
              name="enter_payment"
              onChange={(e) => {
                setTotalPayment(+e.target.value);

                console.log('Entered Payment:', e.target.value);
              }}
            />
            <DialogClose>
              <Button
                disabled={
                  stall.total_amount_to_pay === null
                    ? totalPayment > calculateLeaseAmount(stall.lease_duration)
                    : stall.total_amount_to_pay - totalPayment < 0 ||
                      totalPayment === 0
                }
                type="submit"
                className="my-4"
              >
                Submit
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PayDialog;
