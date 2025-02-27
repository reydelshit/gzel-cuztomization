import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ExportToPDF } from '@/components/ExportToPDF';
import PaginationTemplate from '@/components/Pagination';
import MarkOverdueDialog from '@/components/payments/MarkOverdueDialog';
import PayDialog from '@/components/payments/PayDialog';
import RenewDialog from '@/components/payments/RenewDialog';
import SendSMSDialog from '@/components/payments/SendSMSDialog';
import { Input } from '@/components/ui/input';
import ViewDialog from '@/components/ViewDialog';
import usePagination from '@/hooks/usePagination';
import { StallsTypes } from '@/types';
import axios from 'axios';
import moment from 'moment';

const Payment = () => {
  const [stalls, setStalls] = useState<StallsTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchStalls = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/tenants/payments`,
      );

      console.log(res.data, 'stalls');
      setStalls(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStalls();
  }, []);

  const filteredSTenatns = stalls.filter(
    (stall) =>
      stall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.business_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.stall_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.payment_status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const { currentItems, totalPages, currentPage, handlePageChange } =
    usePagination({
      itemsPerPage: 10,
      data: filteredSTenatns,
    });

  return (
    <div className="my-[2rem]">
      <h1 className="text-8xl text-start mb-[5rem] font-bold italic">
        PAYMENT
      </h1>

      <div className="flex justify-between w-full h-[3rem] my-4">
        <h1 className="text-start font-semibold text-2xl">LIST OF PAYMENTS </h1>

        <div className="flex  justify-end w-fit gap-4 mx-[2rem]">
          <Input
            className="w-[400px] bg-white h-full"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <ExportToPDF
            data={stalls.map((stall) => {
              return {
                'Tenants ID': stall.tenants_id,
                'Owner Name': stall.name,
                Start: moment(stall.created_at).format('LL'),
                Expiration: (() => {
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
                })(),
                Duration: stall.lease_duration,
                'Total Payments': stall.total_amount,
                'Total Amount to Pay':
                  stall.total_amount_to_pay === 0
                    ? 'PAID - Open for renewal'
                    : stall.total_amount_to_pay,
                'Current Payments': stall.current_total_payments,
                'Payment Status': stall.payment_status,
              };
            })}
            fileName="List_payments"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stall No.</TableHead>
            <TableHead>Owner Name</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Total Payments</TableHead>
            <TableHead>Total Amount to Pay</TableHead>
            <TableHead>Current Payments</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(stalls) && stalls.length > 0 ? (
            currentItems.map((stall, index) => (
              <TableRow key={index}>
                <TableCell>{stall.stall_no}</TableCell>

                <TableCell>{stall.name}</TableCell>
                <TableCell>{moment(stall.created_at).format('LL')}</TableCell>
                <TableCell>
                  <h1>
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
                          createdDate.setFullYear(
                            createdDate.getFullYear() + 1,
                          );
                          break;
                      }

                      return createdDate.toLocaleDateString();
                    })()}
                  </h1>
                </TableCell>

                <TableCell>{stall.lease_duration}</TableCell>
                <TableCell>
                  <span className="border-b-4 border-yellow-500 font-bold p-2">
                    ₱{stall.total_amount}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="border-b-4 border-red-500 font-bold p-2">
                    ₱{' '}
                    {stall.total_amount_to_pay === 0
                      ? 'PAID - Open for renewal'
                      : stall.total_amount_to_pay}
                  </span>
                </TableCell>

                <TableCell>
                  {' '}
                  <span className="border-b-4 border-green-500 font-bold p-2">
                    ₱{stall.current_total_payments}
                  </span>
                </TableCell>

                <TableCell>
                  {stall.payment_status.toLowerCase() === 'unpaid' ? (
                    <span className="bg-yellow-500 text-white p-2 rounded-sm">
                      {stall.payment_status}
                    </span>
                  ) : stall.payment_status.toLowerCase() === 'overdue' ? (
                    <span className="bg-red-500 text-white p-2 rounded-sm">
                      {stall.payment_status}
                    </span>
                  ) : stall.total_amount_to_pay === 0 ? (
                    <span className="bg-green-500 text-white p-2 rounded-sm">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-blue-500 text-white p-2 rounded-sm">
                      {stall.payment_status}
                    </span>
                  )}
                </TableCell>

                <TableCell className="flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Button>Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <PayDialog stall={stall} fetchStalls={fetchStalls} />
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <RenewDialog stall={stall} fetchStalls={fetchStalls} />
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <MarkOverdueDialog
                          stall={stall}
                          fetchStalls={fetchStalls}
                        />
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <RemoveDialog />
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <SendSMSDialog stall={stall} />

                  <ViewDialog stall={stall} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PaginationTemplate
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />

      <div className="fixed top-5 right-5 flex flex-col gap-2 p-4 rounded-lg w-fit">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Ongoing</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-400 rounded"></div>
          <span className="text-sm text-gray-600">Paid</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Overdue</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-600">Unpaid</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
