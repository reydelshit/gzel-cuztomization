import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import OrderDialog from './OrderDialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, DollarSign, Upload, Wallet, X } from 'lucide-react';

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
    paymentMethod: 'gcash',
  });

  const userID = localStorage.getItem('userID');
  const [isLoading, setIsLoading] = useState(false);

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('error');
        setUploadError('File size exceeds 5MB limit');
        setPaymentProof(null);
        return;
      }

      // Check file type (only images)
      if (!file.type.startsWith('image/')) {
        setUploadStatus('error');
        setUploadError('Only image files are allowed');
        setPaymentProof(null);
        return;
      }

      setPaymentProof(file);
      setUploadStatus('success');
      setUploadError('');
    }
  };

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!orderData) {
        console.error('Order data is missing.');
        return;
      }

      if (
        (formData.paymentMethod === 'gcash' ||
          formData.paymentMethod === 'paypal') &&
        !paymentProof
      ) {
        setUploadStatus('error');
        setUploadError('Please upload payment proof to continue');
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
      formDataObj.append('payment_proof', paymentProof || '');

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

        setOpen(false);
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

  const getPaymentInstructions = () => {
    switch (formData.paymentMethod) {
      case 'gcash':
        return 'Please send your payment to GCash number: 09123456789 and upload the screenshot of your payment.';
      case 'paypal':
        return 'Please send your payment to PayPal email: example@email.com and upload the screenshot of your payment.';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Place Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[900px] p-2">
        {!showPayment ? (
          <OrderDialog
            onProceedToPayment={(data) => {
              setOrderData(data);
              setShowPayment(true);
            }}
          />
        ) : (
          <div className="w-full max-w-5xl p-4  overflow-hidden">
            <div>
              <h2 className="text-2xl font-semibold">Complete Your Order</h2>
              <p className="text-muted-foreground">
                Review your order and provide payment details
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Order Summary Section */}
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-medium mb-3">Order Summary</h3>
                {orderData && (
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">Fabric:</p>
                      <p className="font-medium text-right">
                        {orderData.fabric}
                      </p>

                      <p className="text-muted-foreground">Quantity:</p>
                      <p className="font-medium text-right">
                        {orderData.quantity}
                      </p>

                      <p className="text-muted-foreground">Measurements:</p>
                      <div className="text-right">
                        <p className="font-medium">
                          Bust: {orderData.measurements.bust}
                        </p>
                        <p className="font-medium">
                          Waist: {orderData.measurements.waist}
                        </p>
                        <p className="font-medium">
                          Shoulder: {orderData.measurements.shoulder}
                        </p>
                      </div>

                      <Separator className="col-span-2 my-2" />

                      <p className="text-muted-foreground font-medium">
                        Total Price:
                      </p>
                      <p className="font-bold text-right">
                        ₱{orderData.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Form */}

              <div className=" md:w-1/2 ">
                <form onSubmit={handleCreateOrder} className="w-full space-y-4">
                  <h3 className="text-lg font-medium mb-3">
                    Shipping & Payment
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Shipping Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => {
                        setFormData({ ...formData, paymentMethod: value });
                        // Reset upload state when changing payment method
                        setPaymentProof(null);
                        setUploadStatus('idle');
                        setUploadError('');
                      }}
                      className="grid grid-cols-3 gap-2"
                    >
                      <div className="relative">
                        <RadioGroupItem
                          value="cash"
                          id="cash"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="cash"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <DollarSign className="mb-3 h-6 w-6" />
                          Cash
                        </Label>
                      </div>

                      <div className="relative">
                        <RadioGroupItem
                          value="gcash"
                          id="gcash"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="gcash"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Wallet className="mb-3 h-6 w-6" />
                          GCash
                        </Label>
                      </div>

                      <div className="relative">
                        <RadioGroupItem
                          value="paypal"
                          id="paypal"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="paypal"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {(formData.paymentMethod === 'gcash' ||
                    formData.paymentMethod === 'paypal') && (
                    <div className="mt-4 space-y-4">
                      <Alert className="bg-muted">
                        <AlertDescription>
                          {getPaymentInstructions()}
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <Label htmlFor="payment-proof">
                          Upload Payment Proof
                        </Label>
                        <div className="grid gap-2">
                          <div className="flex items-center justify-center w-full">
                            <Label
                              htmlFor="payment-proof"
                              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                            >
                              {!paymentProof ? (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                                  <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{' '}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    PNG, JPG or JPEG (MAX. 5MB)
                                  </p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center">
                                  <Check className="w-6 h-6 mb-2 text-green-500" />
                                  <p className="text-sm font-medium">
                                    {paymentProof.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {(paymentProof.size / 1024 / 1024).toFixed(
                                      2,
                                    )}{' '}
                                    MB
                                  </p>
                                </div>
                              )}
                              <Input
                                id="payment-proof"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                              />
                            </Label>
                          </div>

                          {uploadStatus === 'error' && (
                            <div className="flex items-center text-destructive text-sm">
                              <X className="w-4 h-4 mr-1" />
                              {uploadError}
                            </div>
                          )}

                          {paymentProof && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setPaymentProof(null);
                                setUploadStatus('idle');
                              }}
                            >
                              Remove file
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-6 p-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowPayment(false)}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button className="w-full">Complete Order</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
