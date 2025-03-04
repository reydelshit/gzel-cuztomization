import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ProductOrders } from './Orders';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [period, setPeriod] = useState('day');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderData, setProductsOrders] = useState<ProductOrders[]>([]);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/orders`);
      console.log(res.data);

      setProductsOrders(
        res.data.filter((order: ProductOrders) => order.status !== 'cancelled'),
      );
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Process data based on period and status filter
  const processedData = useMemo(() => {
    if (!orderData.length) return [];

    // Filter by status if needed
    const filteredOrders =
      statusFilter === 'all'
        ? orderData
        : orderData.filter(
            (order) =>
              order.status.toLowerCase() === statusFilter.toLowerCase(),
          );

    // Helper function to get week number

    // Group by period
    const groupedData = filteredOrders.reduce(
      (
        acc: Record<string, { day: string; earnings: number; orders: number }>,
        order,
      ) => {
        const date = new Date(order.created_at);
        let key = '';

        if (period === 'day') {
          key = date.toLocaleDateString('en-US', { weekday: 'short' }); // "Mon", "Tue", etc.
        } else if (period === 'week') {
          key = `Week ${getWeekNumber(date)}`;
        } else {
          key = date.toLocaleDateString('en-US', { month: 'short' }); // "Jan", "Feb", etc.
        }

        if (!acc[key]) {
          acc[key] = { day: key, earnings: 0, orders: 0 };
        }

        acc[key].earnings += order.totalPrice;
        acc[key].orders += 1;

        return acc;
      },
      {},
    );

    // Convert to sorted array
    return Object.values(groupedData).sort((a, b) => {
      if (period === 'day') {
        const daysOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
      } else if (period === 'week') {
        return parseInt(a.day.split(' ')[1]) - parseInt(b.day.split(' ')[1]);
      }
      return 0;
    });
  }, [period, statusFilter, orderData]);

  // Calculate total earnings and profit percentage
  const totalEarnings = useMemo(() => {
    if (!orderData.length) return 0;

    const now = new Date();
    const today = now.toLocaleDateString('en-CA'); // "YYYY-MM-DD" in local timezone
    const currentWeek = getWeekNumber(now);
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return orderData.reduce((sum, order) => {
      const orderDate = new Date(order.created_at);
      const orderWeek = getWeekNumber(orderDate);
      const orderMonth = orderDate.getMonth();
      const orderYear = orderDate.getFullYear();
      const orderDay = orderDate.toLocaleDateString('en-CA'); // Local timezone

      if (
        (period === 'day' && orderDay === today) ||
        (period === 'week' &&
          orderWeek === currentWeek &&
          orderYear === currentYear) ||
        (period === 'month' &&
          orderMonth === currentMonth &&
          orderYear === currentYear) ||
        period === 'all'
      ) {
        return sum + order.totalPrice;
      }
      return sum;
    }, 0);
  }, [period, orderData]);

  // Calculate profit percentage (this would typically be based on costs vs revenue)
  const profitPercentage = 3.5;

  // Format currency
  const formatCurrency = (value: number) => {
    return `P ${value.toLocaleString()}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColors: Record<ProductOrders['status'], string> = {
    new: 'bg-blue-100 text-blue-500',
    processing: 'bg-orange-100 text-orange-500',
    pickup: 'bg-purple-100 text-purple-500',
    done: 'bg-green-100 text-green-500',
    cancelled: 'bg-red-100 text-red-500',
    declined: 'bg-red-100 text-red-500',
  };

  const filteredData =
    statusFilter === 'all'
      ? orderData
      : orderData.filter((order) => order.status === statusFilter);

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
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <header className="flex h-[4rem] items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-black uppercase italic">
          Reports
        </h1>
      </header>

      <div className="space-y-6 px-6">
        <Tabs defaultValue="day" onValueChange={setPeriod}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="day">Daily</TabsTrigger>
              <TabsTrigger value="week">Weekly</TabsTrigger>
              <TabsTrigger value="month">Monthly</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 ">
              <Select value={statusFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px] bg-white overflow-hidden">
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
            </div>
          </div>

          <TabsContent value="day" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {formatCurrency(totalEarnings)}
                    </CardTitle>
                    <CardDescription>Daily earnings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(value: number) => [
                          `${formatCurrency(value as number)}`,
                          'Earnings',
                        ]}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      />
                      <Bar
                        dataKey="earnings"
                        fill="hsl(142, 76%, 36%)"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {formatCurrency(totalEarnings)}
                    </CardTitle>
                    <CardDescription>Weekly earnings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(value: number) => [
                          `${formatCurrency(value as number)}`,
                          'Earnings',
                        ]}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      />
                      <Bar
                        dataKey="earnings"
                        fill="hsl(142, 76%, 36%)"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {formatCurrency(totalEarnings)}
                    </CardTitle>
                    <CardDescription>Monthly earnings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(value: number) => [
                          `${formatCurrency(value as number)}`,
                          'Earnings',
                        ]}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      />
                      <Bar
                        dataKey="earnings"
                        fill="hsl(142, 76%, 36%)"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {formatCurrency(totalEarnings)}
                    </CardTitle>
                    <CardDescription>All Time Earnings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(value: number) => [
                          `${formatCurrency(value as number)}`,
                          'Earnings',
                        ]}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      />
                      <Bar
                        dataKey="earnings"
                        fill="hsl(142, 76%, 36%)"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl">
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
                    Payment Method
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Proof of Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order) => (
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
                      {order.size_bust}/{order.size_waist}/{order.size_shoulder}
                    </td>
                    <td className="px-4 py-3 text-sm">{order.fabric}</td>
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
};

export default Reports;
