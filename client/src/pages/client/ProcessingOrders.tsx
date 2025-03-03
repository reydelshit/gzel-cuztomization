import axios from 'axios';
import { CheckCircle, ClockIcon, FileTextIcon, XCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

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
import { Input } from '@/components/ui/input';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import useCreateNotif from '@/hooks/useCreateNotif';
import {
  CreditCard,
  Eye,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from 'lucide-react';
import { OrderCard, ProductOrders } from '../admin/Orders';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const NewOrders = () => {
  const [productsOrders, setProductsOrders] = useState<ProductOrders[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<ProductOrders | null>(
    null,
  );
  const { createNotif } = useCreateNotif();

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/orders`);
      console.log(res.data);

      setProductsOrders(
        res.data.filter(
          (order: ProductOrders) => order.status === 'processing',
        ),
      );
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const statusColors: Record<ProductOrders['status'], string> = {
    new: 'bg-blue-100 text-blue-500',
    processing: 'bg-orange-100 text-orange-500',
    pickup: 'bg-purple-100 text-purple-500',
    done: 'bg-green-100 text-green-500',
    cancelled: 'bg-red-100 text-red-500',
    declined: 'bg-red-100 text-red-500',
  };

  const handleChangeStatus = async (order_id: number, type: string) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_SERVER_LINK
        }/orders/update/order-status/${order_id}`,
        {
          status: type,
        },
      );

      if (res.data.status === 'success') {
        createNotif({
          title:
            type === 'pickup'
              ? 'Your order is ready for pickup'
              : 'Your order has been successfully completed',
          message:
            type === 'pickup'
              ? 'Your order is now ready for pickup. Please visit our store to get your order.'
              : 'Your order has been successfully completed. Thank you for trusting with us!',

          receiver_id: selectedOrder?.user_id || 0,
        });

        toast({
          title: 'Order status updated',
          description:
            type === 'pickup'
              ? 'Order is now ready for pickup'
              : 'Order has been successfully completed',
        });

        fetchOrders();

        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  return (
    <div className="min-h-screen ">
      <header className="flex h-[4rem] items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-black uppercase italic">
          Processing ORders
        </h1>
      </header>
      <div className="p-6 flex gap-4 h-full">
        <div className="w-2/4">
          <OrderCard
            handleClick={() => {}}
            title="Processing Orders"
            count={
              productsOrders.filter(
                (order) => order.status.toLowerCase() === 'processing',
              ).length || 0
            }
            icon={<ClockIcon className="h-6 w-6 text-gray-500" />}
            chartColor="green"
          />

          <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto mt-[2rem] p-2 flex flex-col">
            <Input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search orders..."
              className="max-w-[200px] self-end"
            />
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                    Size (B/W/S)
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                    Qty
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                    Payment Method
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsOrders
                  .filter((order) =>
                    order.fullname
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                  )
                  .map((order) => (
                    <tr
                      key={order.order_id}
                      onClick={() => {
                        console.log(order);
                        setSelectedOrder(order);
                      }}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm">#{order.order_id}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium">{order.fullname}</div>
                        <div className="text-xs text-gray-500">
                          {order.phone_number}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {order.size_bust}/{order.size_waist}/
                        {order.size_shoulder}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        ₱{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.quantity}</td>

                      <td className="px-4 py-3 text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {order.payment_method}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-2/4 ">
          {selectedOrder ? (
            <Card className="w-full max-w-3xl shadow-lg rounded-xl border border-gray-200 overflow-hidden">
              <CardHeader className="bg-white border-b pb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Order #{selectedOrder.order_id}
                    </p>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      Order Details
                    </CardTitle>
                  </div>
                  <Badge
                    className={`capitalize px-3 py-1.5 text-sm font-medium ${
                      statusColors[selectedOrder.status]
                    }`}
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-6 pb-2 px-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <User size={18} className="text-gray-500" />
                      Customer Information
                    </h3>

                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-start gap-2">
                        <User
                          size={16}
                          className="text-gray-500 mt-1 shrink-0"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">
                            {selectedOrder.fullname}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Phone
                          size={16}
                          className="text-gray-500 mt-1 shrink-0"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium">
                            {selectedOrder.phone_number}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin
                          size={16}
                          className="text-gray-500 mt-1 shrink-0"
                        />
                        <div>
                          <p className="text-sm text-gray-500">
                            Shipping Address
                          </p>
                          <p className="font-medium">
                            {selectedOrder.shipping_address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <ShoppingBag size={18} className="text-gray-500" />
                      Order Information
                    </h3>

                    <div className="space-y-3 text-gray-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Order Date</p>
                          <p className="font-medium">
                            {new Date(
                              selectedOrder.created_at,
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Order Status</p>

                          <span
                            className={`capitalize px-3 py-1.5 text-sm font-medium ${
                              statusColors[selectedOrder.status]
                            }`}
                          >
                            {selectedOrder.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Fabric</p>
                          <p className="font-medium">{selectedOrder.fabric}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="font-medium">
                            {selectedOrder.quantity}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Size</p>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div className="bg-gray-100 px-3 py-1.5 rounded-md text-center">
                            <p className="text-xs text-gray-500">Bust</p>
                            <p className="font-medium">
                              {selectedOrder.size_bust}
                            </p>
                          </div>
                          <div className="bg-gray-100 px-3 py-1.5 rounded-md text-center">
                            <p className="text-xs text-gray-500">Waist</p>
                            <p className="font-medium">
                              {selectedOrder.size_waist}
                            </p>
                          </div>
                          <div className="bg-gray-100 px-3 py-1.5 rounded-md text-center">
                            <p className="text-xs text-gray-500">Shoulder</p>
                            <p className="font-medium">
                              {selectedOrder.size_shoulder}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* T-shirt Design */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    T-shirt Design
                  </h3>
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={
                        selectedOrder.tshirtDesignPath
                          ? `${
                              import.meta.env.VITE_SERVER_LINK ||
                              'https://example.com'
                            }/${selectedOrder.tshirtDesignPath}`
                          : 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000'
                      }
                      alt="T-shirt Design"
                      className="w-full aspect-video object-contain bg-white"
                    />

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute bottom-3 right-3 gap-1.5"
                        >
                          <Eye size={16} />
                          View Larger
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>T-shirt Design Preview</DialogTitle>
                          <DialogDescription>
                            High-resolution preview of the custom t-shirt design
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 bg-white p-2 rounded-lg">
                          <img
                            src={
                              selectedOrder.tshirtDesignPath
                                ? `${
                                    import.meta.env.VITE_SERVER_LINK ||
                                    'https://example.com'
                                  }/${selectedOrder.tshirtDesignPath}`
                                : 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000'
                            }
                            alt="T-shirt Design"
                            className="w-full rounded-md object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Payment Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <CreditCard size={18} className="text-gray-500" />
                    Payment Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium">
                          {selectedOrder.payment_method}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="text-xl font-bold text-gray-900">
                          ₱{selectedOrder.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {selectedOrder.payment_proof && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Payment Proof
                        </p>
                        <div className="relative h-24 w-full bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={
                              selectedOrder.payment_proof
                                ? `${
                                    import.meta.env.VITE_SERVER_LINK ||
                                    'https://example.com'
                                  }/${selectedOrder.payment_proof}`
                                : 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000'
                            }
                            alt="Payment Proof"
                            className="h-full w-full object-cover"
                          />

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="absolute bottom-2 right-2 gap-1.5"
                              >
                                <Eye size={14} />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Payment Proof</DialogTitle>
                              </DialogHeader>
                              <div className="mt-4 bg-white p-2 rounded-lg">
                                <img
                                  src={
                                    selectedOrder.payment_proof
                                      ? `${
                                          import.meta.env.VITE_SERVER_LINK ||
                                          'https://example.com'
                                        }/${selectedOrder.payment_proof}`
                                      : 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000'
                                  }
                                  alt="Payment Proof"
                                  className="w-full rounded-md"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 border-t px-6 py-4 mt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Back to Orders
                </Button>

                <Select
                  onValueChange={(value) =>
                    handleChangeStatus(selectedOrder.order_id, value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Ready for Pickup</SelectItem>
                    <SelectItem value="done">Order Completed</SelectItem>
                  </SelectContent>
                </Select>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewOrders;
