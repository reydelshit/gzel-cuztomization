import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StallsTypes } from '@/types';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { History } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import PaginationTemplate from './Pagination';
import usePagination from '@/hooks/usePagination';

interface PaymentHistory {
  payment_id: number;
  current_balance: number;
  amount_pay: number;
  created_at: string;
}
const ViewDialog = ({ stall }: { stall: StallsTypes }) => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);

  const handleFetchPaymentHistory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/payments/${stall.tenants_id}`,
      );

      setPaymentHistory(res.data);
      console.log(res.data, 'paymentsss');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchPaymentHistory();
  }, []);

  const { currentItems, totalPages, currentPage, handlePageChange } =
    usePagination({
      itemsPerPage: 10,
      data: paymentHistory,
    });

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          onClick={() => handleFetchPaymentHistory()}
          className="bg-yellow-500 hover:bg-yellow-400"
        >
          {' '}
          <History size={15} /> View
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%]">
        <DialogHeader>
          <DialogTitle>{stall.business_name}</DialogTitle>
          <DialogDescription>
            {stall.name} is a business owner of {stall.business_type} and has a
            stall number of {stall.stall_no}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Owner
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.name}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Date of Birth
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.date_birth}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Gender
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.gender}
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium text-gray-500">
                  Address
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.address}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Nationality
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.nationality}
                </p>
              </div>
            </div>

            {/* Business Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Business Type
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.business_type}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Contact Information
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.phone}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.email}
                </p>
              </div>
            </div>

            {/* Lease Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Rental Info
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {stall.lease_duration}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Expiration
                </Label>
                <p className="text-lg font-semibold text-gray-900">
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
                </p>
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Signed Lease Agreement
                  </Label>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      src={`${import.meta.env.VITE_SERVER_LINK}/api/${
                        stall.signed_lease_path
                      }`}
                      alt="signed lease"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    ID Proof
                  </Label>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      src={`${import.meta.env.VITE_SERVER_LINK}/api/${
                        stall.id_proof_path
                      }`}
                      alt="ID Proof"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex w-full justify-between items-center my-4">
              <h1 className="font-semibold text-2xl">Payment History</h1>

              <div>
                <h1 className="font-bold">
                  RENEWAL COUNTER : {stall.renewal_counter}
                </h1>
                <p className="text-sm">
                  Only shows 10 per page. Click the page number to view more.
                </p>
              </div>
            </div>
            <Table>
              <TableCaption>A list of payment history.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableCell>Payment ID</TableCell>
                  {/* <TableCell>Status</TableCell> */}
                  <TableCell>Payment Method</TableCell>
                  <TableCell className="text-center">Amount Paid</TableCell>
                  <TableCell className="text-right">Date</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.length > 0 ? (
                  currentItems.map((payment) => (
                    <TableRow key={payment.payment_id}>
                      <TableCell className="font-medium">
                        {payment.payment_id}
                      </TableCell>
                      {/* <TableCell>
                        {payment.current_balance === 0 ? (
                          <span className="text-green-600">Paid</span>
                        ) : (
                          <span className="text-red-600">Pending</span>
                        )}
                      </TableCell> */}
                      <TableCell>CASH</TableCell>
                      <TableCell className="text-right">
                        ₱{payment.amount_pay}
                      </TableCell>
                      <TableCell className="text-right">
                        {moment(payment.created_at).format('LL')}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No payment history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <PaginationTemplate
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
