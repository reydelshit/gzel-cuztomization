import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EyeIcon,
  MoreHorizontalIcon,
  XCircle,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCreateNotif from '@/hooks/useCreateNotif';
import { toast } from '@/hooks/use-toast';

export type ProductOrders = {
  created_at: string;
  fabric: string;
  fullname: string;
  order_id: number;
  payment_method: string;
  phone_number: string;
  quantity: number;
  shipping_address: string;
  size_bust: string;
  size_shoulder: string;
  size_waist: string;
  payment_proof: string;
  totalPrice: number;
  tshirtDesignPath: string;
  user_id: number;
  status: 'new' | 'processing' | 'pickup' | 'done' | 'cancelled' | 'declined';
};

interface Fabric {
  id: number;
  fabricName: string;
  price: number;
}

export default function PurchaseTable2() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('all');
  const [productsOrders, setProductsOrders] = useState<ProductOrders[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userID = parseInt(localStorage.getItem('userID') || '0', 10);
  const { createNotif } = useCreateNotif();

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/orders`);
      console.log(res.data);

      setProductsOrders(
        res.data.filter((order: ProductOrders) => order.user_id === userID),
      );
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter data based on status
  const filteredData =
    filterStatus === 'all'
      ? productsOrders
      : productsOrders.filter((order) => order.status === filterStatus);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value));
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  const handleCLickNavigate = (type: string) => {
    const routes: Record<string, string> = {
      new: '/orders/new',
      pending: '/orders/pending',
    };

    if (routes[type]) {
      navigate(routes[type]);
    }
  };

  const statusColors: Record<ProductOrders['status'], string> = {
    new: 'bg-blue-100 text-blue-500',
    processing: 'bg-orange-100 text-orange-500',
    pickup: 'bg-purple-100 text-purple-500',
    done: 'bg-green-100 text-green-500',
    cancelled: 'bg-red-100 text-red-500',
    declined: 'bg-red-100 text-red-500',
  };

  const ListFabric: Fabric[] = [
    { id: 0, fabricName: 'Polyester', price: 300 },
    { id: 1, fabricName: 'Cotton', price: 350 },
    { id: 2, fabricName: 'Linen', price: 400 },
    { id: 3, fabricName: 'Silk', price: 600 },
  ];

  const getUnitPrice = (fabricName: string): number | undefined => {
    const fabric = ListFabric.find((f) => f.fabricName === fabricName);
    return fabric ? fabric.price : undefined;
  };

  const handleCancelOrder = async (order_id: number) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_SERVER_LINK
        }/orders/update/order-status/${order_id}`,
        {
          status: 'cancelled',
        },
      );

      if (res.data.status === 'success') {
        createNotif({
          title: 'Order Cancelled',
          message: `
                Customer with user ID${userID} has cancelled their order with order ID ${order_id}.
            `,
          receiver_id: 0,
        });

        toast({
          title: 'Order Cancelled',
          description: 'The order has been successfully cancelled.',
        });

        fetchOrders();
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  return (
    <div className="rounded-lg shadow h-screen">
      <header className="flex h-[4rem] items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-black uppercase italic">
          your purchases
        </h1>
      </header>
      <div className="w-full flex flex-col justify-center items-center p-6 gap-8">
        <div className="w-full bg-white rounded-lg shadow h-full">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold">List of your Orders</h2>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder="Search orders..."
                className="max-w-[200px]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Size (B/W/S)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Fabric
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Unit Price
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Total Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Payment Method
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Proof of Payment
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems
                  .filter((order) =>
                    order.fullname
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                  )
                  .map((order) => (
                    <tr
                      key={order.order_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm">#{order.order_id}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium">
                          <img
                            src={
                              order.tshirtDesignPath
                                ? `${import.meta.env.VITE_SERVER_LINK}/${
                                    order.tshirtDesignPath
                                  }`
                                : '/fallback-image.jpg'
                            }
                            alt="T-shirt Design"
                            className="max-h-[80px] object-contain rounded-md "
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {order.size_bust}/{order.size_waist}/
                        {order.size_shoulder}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.fabric}</td>
                      <td className="px-4 py-3 text-sm">
                        ₱{getUnitPrice(order.fabric)?.toFixed(2)}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        ₱{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.quantity}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {order.payment_method}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {order.payment_method === 'cash' ? (
                          'N/A'
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <span className="text-blue-500 cursor-pointer underline">
                                view
                              </span>
                            </DialogTrigger>
                            <DialogContent className="max-w-[1200px]">
                              <DialogHeader>
                                <DialogTitle>Design Preview</DialogTitle>
                                <DialogDescription>
                                  {order.payment_proof ? (
                                    <div className="mt-4 flex justify-center">
                                      <img
                                        src={
                                          order.payment_proof
                                            ? `${
                                                import.meta.env.VITE_SERVER_LINK
                                              }/${order.payment_proof}`
                                            : '/fallback-image.jpg'
                                        }
                                        alt="T-shirt Design"
                                        className="max-h-[700px] object-contain rounded-md "
                                      />
                                    </div>
                                  ) : (
                                    <p>No design image available</p>
                                  )}
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        )}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          {/* <Button variant="ghost" size="icon" title="Delete">
                          <TrashIcon className="h-4 w-4" />
                        </Button> */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    className="border-none"
                                    variant={'outline'}
                                    size="sm"
                                  >
                                    <EyeIcon /> View Design
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[1200px]">
                                  <DialogHeader>
                                    <DialogTitle>Design Preview</DialogTitle>
                                    <DialogDescription>
                                      {order.tshirtDesignPath ? (
                                        <div className="mt-4 flex justify-center">
                                          <img
                                            src={
                                              order.tshirtDesignPath
                                                ? `${
                                                    import.meta.env
                                                      .VITE_SERVER_LINK
                                                  }/${order.tshirtDesignPath}`
                                                : '/fallback-image.jpg'
                                            }
                                            alt="T-shirt Design"
                                            className="max-h-[700px] object-contain rounded-md "
                                          />
                                        </div>
                                      ) : (
                                        <p>No design image available</p>
                                      )}
                                    </DialogDescription>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>

                              <DropdownMenuItem
                                onSelect={(event) => event.preventDefault()}
                              >
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      disabled={order.status !== 'new'}
                                      className="border-none"
                                      variant={'outline'}
                                      size="sm"
                                    >
                                      <XCircle /> Cancel Order
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Cancelling Order
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        <p className="mb-4">
                                          Are you sure you want to cancel this
                                          order? This action cannot be undone.
                                        </p>

                                        {(order.payment_method === 'gcash' ||
                                          order.payment_method ===
                                            'paypal') && (
                                          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm mb-4">
                                            <p className="font-medium mb-1">
                                              Important Note:
                                            </p>
                                            <p>
                                              Since this order was paid via{' '}
                                              {order.payment_method}, the
                                              payment will be automatically
                                              refunded to your account within
                                              3-5 business days.
                                            </p>
                                          </div>
                                        )}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                        onClick={() =>
                                          handleCancelOrder(order.order_id)
                                        }
                                      >
                                        Cancel Order
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-between items-center border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to{' '}
                {Math.min(indexOfLastItem, filteredData.length)} of{' '}
                {filteredData.length} entries
              </span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">per page</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1),
                )
                .map((page, index, array) => {
                  // Add ellipsis
                  if (index > 0 && array[index - 1] !== page - 1) {
                    return (
                      <span key={`ellipsis-${page}`} className="px-2">
                        ...
                      </span>
                    );
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                })}

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
