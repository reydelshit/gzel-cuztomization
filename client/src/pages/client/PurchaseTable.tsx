import { TableHeader } from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ProductOrders } from '../admin/Orders';
// Updated product data to include status

interface SizeChart {
  size: string;
  bust: string;
  waist: string;
  shoulder: string;
}

interface Fabric {
  id: number;
  fabricName: string;
  price: number;
}

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [products, setProducts] = useState<ProductOrders[]>([]);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  // Calculate totals
  const totalQuantity = currentItems.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );
  const totalPrice = currentItems.reduce(
    (sum, product) => sum + product.totalPrice,
    0,
  );

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/orders`);
      console.log(res.data);

      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle checkbox selection
  const toggleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map((item) => item.order_id));
    }
  };

  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const sizeChart: SizeChart[] = [
    { size: 'XS', bust: '30-32', waist: '23-25', shoulder: '14-15' },
    { size: 'S', bust: '32-34', waist: '25-27', shoulder: '15-16' },
    { size: 'M', bust: '34-36', waist: '27-29', shoulder: '16-17' },
    { size: 'L', bust: '36-38', waist: '29-31', shoulder: '17-18' },
    { size: 'XL', bust: '38-40', waist: '31-33', shoulder: '18-19' },
    { size: 'XXL', bust: '40-42', waist: '33-35', shoulder: '19-20' },
  ];

  const getSizeLabel = (bust: string): string | undefined => {
    const size = sizeChart.find((s) => s.bust === bust);
    return size ? size.size : undefined;
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

  const statusColors: Record<ProductOrders['status'], string> = {
    new: 'bg-blue-100 text-blue-500',
    processing: 'bg-orange-100 text-orange-500',
    pickup: 'bg-purple-100 text-purple-500',
    done: 'bg-green-100 text-green-500',
    cancelled: 'bg-red-100 text-red-500',
    declined: 'bg-red-100 text-red-500',
  };

  return (
    <div className="w-[80%] space-y-4">
      <div className="rounded-2xl border bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Bust</TableHead>
              <TableHead className="text-right">Waist</TableHead>
              <TableHead className="text-right">Shoulder</TableHead>

              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {/* Updated TableBody to include Status and replace dropdown with buttons */}
          <TableBody>
            {currentItems.map((product, index) => (
              <TableRow className="h-[4rem]" key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        product.tshirtDesignPath
                          ? `${import.meta.env.VITE_SERVER_LINK}/${
                              product.tshirtDesignPath
                            }`
                          : '/fallback-image.jpg'
                      }
                      alt={product.fullname || 'Product'}
                      className="rounded-md border h-full w-[5rem]"
                    />
                    <span>TSHIRT - {getSizeLabel(product.size_bust)}</span>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  {product.size_bust}
                </TableCell>

                <TableCell className="text-right">
                  {product.size_waist}
                </TableCell>

                <TableCell className="text-right">
                  {product.size_shoulder}
                </TableCell>

                <TableCell className="text-right">
                  P <span>{getUnitPrice(product.fabric)}</span>
                </TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell className="text-right">
                  {product.totalPrice}
                </TableCell>
                <TableCell>
                  <span
                    className={`${
                      statusColors[product.status]
                    }  px-3 py-1.5 text-sm font-medium rounded-2xl`}
                  >
                    {product.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer with totals and pagination */}
      <div className="flex items-center justify-between border rounded-md p-2 bg-white">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={
              currentItems.length > 0 &&
              selectedItems.length === currentItems.length
            }
            onCheckedChange={toggleSelectAll}
          />
          <span className="text-sm">Select all</span>
          <Button variant="outline" size="sm" className="ml-4">
            Cancel
          </Button>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm font-bold">
            Total ({currentItems.length}{' '}
            {currentItems.length === 1 ? 'item' : 'items'}): {totalPrice}
          </div>
          <div className="text-sm font-semibold">
            Total Quantity: {totalQuantity}
          </div>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of{' '}
            {products.length} items
          </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">per page</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm mx-2">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
