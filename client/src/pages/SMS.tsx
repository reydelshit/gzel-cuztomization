import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { stallsGround } from '@/data';
import { stallsSecond } from '@/data';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface TenantsDataTypes {
  name: string;
  date_birth: string;
  gender: string;
  address: string;
  nationality: string;
  phone: string;
  email?: string;
  business_name: string;
  business_type: string;
  lease_duration: string;
}

interface StallsTypes extends TenantsDataTypes {
  signed_lease_path: string;
  id_proof_path: string;
  payment_status: string;
  stall_no: string;
  created_at: string;
}

const SMS = () => {
  const [selectedStalls, setSelectedStalls] = useState<string>('');

  const [stalls, setStalls] = useState<StallsTypes>({} as StallsTypes);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleFetchStalls = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/misc/get-stalls`,
        {
          params: {
            stall_no: selectedStalls,
          },
        },
      );
      setStalls(response.data);
      setPhoneNumber(response.data.phone);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to fetch stalls',
        description: 'An error occurred while fetching stalls',
      });
    }
  };

  useEffect(() => {
    if (selectedStalls) {
      handleFetchStalls();
    }
  }, [selectedStalls]);

  return (
    <div className="flex flex-col w-full p-8 h-full items-center justify-center">
      <div className="flex w-[60%]  gap-4 my-4">
        <Select onValueChange={(value) => setSelectedStalls(value)}>
          <SelectTrigger className="w-[400px] bg-white">
            <SelectValue placeholder="Stall" />
          </SelectTrigger>
          <SelectContent>
            {[...stallsGround, ...stallsSecond].map((stall, index) => (
              <SelectItem key={index} value={stall.id}>
                {stall.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          className="w-full bg-white"
          onChange={(e) => setPhoneNumber(e.target.value)}
          defaultValue={phoneNumber}
          placeholder="Phone number"
        />
      </div>

      <div className="text-start w-[60%] my-4">
        <h1 className="text-2xl font-bold">{stalls.name}</h1>
        <h1 className="text-2xl font-bold">
          Business Name: {stalls.business_name}
        </h1>
        <h1 className="text-2xl font-bold">
          Business Type: {stalls.business_type}
        </h1>

        <h1 className="text-2xl font-bold">
          Lease Duration: {stalls.lease_duration}
        </h1>
      </div>

      <Textarea
        className="bg-white w-[60%] min-h-[400px]"
        placeholder="Message"
      ></Textarea>
    </div>
  );
};

export default SMS;
