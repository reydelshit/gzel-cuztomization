export interface TenantsDataTypes {
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

export interface StallsTypes extends TenantsDataTypes {
  signed_lease_path: string;
  id_proof_path: string;
  payment_status: string;
  stall_no: string;
  created_at: string;
  tenants_id: number;
  total_amount_to_pay: number;
  current_total_payments: number;
  total_amount: number;
  renewal_counter: number;
}
