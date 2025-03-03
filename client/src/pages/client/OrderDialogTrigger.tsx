import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import OrderDialog from './OrderDialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
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
export function OrderDialogTrigger({
  canvasRef,
}: {
  canvasRef: React.RefObject<any>;
}) {
  const [open, setOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    paymentMethod: 'cash',
  });

  const userID = localStorage.getItem('userID');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!orderData) {
        console.error('Order data is missing.');
        return;
      }

      // Convert canvas to image
      const dataURL = canvasRef.current?.toDataURL('image/png');
      const blob = dataURL ? await (await fetch(dataURL)).blob() : null;

      // Create form data
      const formDataObj = new FormData();
      formDataObj.append('size_bust', orderData.measurements.bust);
      formDataObj.append('size_waist', orderData.measurements.waist);
      formDataObj.append('size_shoulder', orderData.measurements.shoulder);
      formDataObj.append('fabric', orderData.fabric);
      formDataObj.append('totalPrice', orderData.totalPrice.toString());
      formDataObj.append('quantity', orderData.quantity.toString());
      formDataObj.append('payment_method', formData.paymentMethod);
      formDataObj.append('user_id', userID || '0');
      formDataObj.append('fullname', formData.fullName);
      formDataObj.append('shipping_address', formData.address);
      formDataObj.append('phone_number', formData.phone);
      formDataObj.append('status', 'processing');

      if (blob) {
        formDataObj.append(
          'tshirtDesignPath',
          blob,
          `${formData.fullName || 'custom-tshirt'}.png`,
        );
      }

      for (const pair of formDataObj.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/orders/create`,
        formDataObj,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      if (res.data.status === 'success') {
        toast({
          title: 'Order Created',
          description: 'Your order has been placed successfully.',
        });

        // setOpen(false);
        setOrderData(null);
        setFormData({
          fullName: '',
          address: '',
          phone: '',
          paymentMethod: 'cash',
        });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Error',
        description: 'Failed to create order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
              <form onSubmit={handleCreateOrder} className="space-y-4">
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
