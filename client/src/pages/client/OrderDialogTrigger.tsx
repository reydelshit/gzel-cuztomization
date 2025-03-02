import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import OrderDialog from './OrderDialog';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
interface OrderData {
  fabric: string;
  quantity: number;
  measurements: {
    bust: string;
    waist: string;
    shoulder: string;
  };
  totalPrice: number;
}
export function OrderDialogTrigger() {
  const [open, setOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    paymentMethod: 'cash',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Define the onSubmit function here
    const onSubmit = (data: typeof formData) => {
      console.log('Form submitted:', data);
      // Add your form submission logic here
    };
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Place Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        {!showPayment ? (
          <OrderDialog
            onProceedToPayment={(data) => {
              setOrderData(data);
              setShowPayment(true);
            }}
          />
        ) : (
          <div className="mx-auto p-6 w-full">
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              {orderData && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <p>
                    <strong>Fabric:</strong> {orderData.fabric}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {orderData.quantity}
                  </p>
                  <p>
                    <strong>Measurements:</strong> Bust:{' '}
                    {orderData.measurements.bust}, Waist:{' '}
                    {orderData.measurements.waist}, Shoulder:{' '}
                    {orderData.measurements.shoulder}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₱{orderData.totalPrice}
                  </p>
                </div>
              )}

              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Mode of Payment</Label>
                  <RadioGroup
                    defaultValue={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, paymentMethod: value })
                    }
                  >
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash</Label>
                      <RadioGroupItem value="gcash" id="gcash" />
                      <Label htmlFor="gcash">GCash</Label>

                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">Paypal</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={'outline'}
                    onClick={() => setShowPayment(false)}
                    className="w-full"
                  >
                    Go Back
                  </Button>
                  <Button type="submit" className="w-full">
                    Confirm
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
