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
import { Textarea } from '@/components/ui/textarea';
import { StallsTypes } from '@/types';
import { Label } from '@radix-ui/react-label';
import { SendHorizontal } from 'lucide-react';
import moment from 'moment';
import { Input } from '../ui/input';
import { useState } from 'react';
import useSendSMS from '@/hooks/useSendSMS';

const SendSMSDialog = ({ stall }: { stall: StallsTypes }) => {
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const { sendSMS } = useSendSMS();
  const handleSendSMS = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message || !phoneNumber) {
      setError('Please fill in all fields');
      return;
    }

    sendSMS({
      content: message,
      to: phoneNumber,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-500 hover:bg-blue-400">
          {' '}
          <SendHorizontal size={15} />
          Send SMS
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[40%]">
        <DialogHeader>
          <DialogTitle>
            Send SMS Message to business: {stall.business_name}
          </DialogTitle>
          <DialogDescription>Owner Name: {stall.name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSendSMS}>
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

            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Phone Number</Label>
              <Input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
                placeholder="Enter phone number"
                defaultValue={stall.phone}
              />
            </div>

            {/* Message Section */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Message</Label>
              <Textarea
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[250px] w-full resize-none border-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here..."
              />
            </div>

            {/* Submit Button */}
            <DialogClose>
              <Button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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

export default SendSMSDialog;
