export interface SimulationAccount {
  _id: string;
  created_at: string;
  updated_at: string;
  account_no: string;
  account_name: string;
  bank_name: string;
  balance: number;
  kyc: number;
  bvn: string;
  merchant: boolean;
  opening_device: string;
  simulation_id: string;
}

export interface AccountQueryParams {
  simulation_id: string;
  limit?: number;
  skip?: number;
  sort?: 'asc' | 'desc';
  query?: string | null;
}