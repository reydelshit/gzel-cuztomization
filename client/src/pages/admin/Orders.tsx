'use client';

import type React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useCallback, useEffect, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { CheckIcon, ClockIcon, FileTextIcon, ListIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';

interface ProductOrders {
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

  totalPrice: number;
  tshirtDesignPath: string;
  user_id: number;
  status: 'Processing' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('all');
  const [productsOrders, setProductsOrders] = useState<ProductOrders[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/orders`);
      console.log(res.data);

      setProductsOrders(res.data);
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

  return (
    <div className="rounded-lg shadow h-screen">
      <header className="flex h-[4rem] items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-black uppercase italic">
          ORDers
        </h1>
      </header>
      <div className="w-full flex flex-col justify-center items-center p-6 gap-8">
        <div className="flex flex-row gap-4 w-full">
          <OrderCard
            title="New Orders"
            count={
              productsOrders.filter(
                (order) => order.status.toLowerCase() === 'processing',
              ).length || 0
            }
            icon={<FileTextIcon className="h-6 w-6 text-gray-500" />}
            chartColor="green"
          />
          <OrderCard
            title="Pending Orders"
            count={
              productsOrders.filter(
                (order) => order.status.toLowerCase() === 'pending',
              ).length || 0
            }
            icon={<ClockIcon className="h-6 w-6 text-gray-500" />}
            chartColor="green"
          />
          <OrderCard
            title="Done Orders"
            count={
              productsOrders.filter(
                (order) => order.status.toLowerCase() === 'Delivered',
              ).length || 0
            }
            icon={<CheckIcon className="h-6 w-6 text-gray-500" />}
            chartColor="green"
          />
          <OrderCard
            title="Total Orders"
            count={productsOrders.length || 0}
            icon={<ListIcon className="h-6 w-6 text-gray-500" />}
            chartColor="green"
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow h-full">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold">List of Orders</h2>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="new">New Orders</SelectItem>
                  <SelectItem value="pending">Pending Orders</SelectItem>
                  <SelectItem value="delivered">Done Orders</SelectItem>
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
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Size (B/W/S)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Fabric
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Price
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
                        <div className="font-medium">{order.fullname}</div>
                        <div className="text-xs text-gray-500">
                          {order.phone_number}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {order.size_bust}/{order.size_waist}/
                        {order.size_shoulder}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.fabric}</td>
                      <td className="px-4 py-3 text-sm">
                        ₱{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.quantity}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Processing'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
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
                                    variant="ghost"
                                    className="w-full justify-start px-2 text-sm"
                                  >
                                    View Design
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

                              <DropdownMenuItem>Mark as Done</DropdownMenuItem>
                              <DropdownMenuItem>Print Invoice</DropdownMenuItem>
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

function OrderCard({
  title,
  count,
  icon,
  chartColor,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  chartColor: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 border rounded-md">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{count.toLocaleString()}</p>
        </div>
      </div>
      <div className="h-12 w-16">
        <svg viewBox="0 0 100 50" className="h-full w-full">
          <path
            d="M0,50 L20,35 L40,40 L60,20 L80,30 L100,10"
            fill="none"
            stroke={chartColor === 'green' ? '#22c55e' : '#3b82f6'}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
