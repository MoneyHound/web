export enum TransactionStatus {
  Failed = 'FAILED',
  Success = 'SUCCESS',
}

export enum TransactionType {
  Debit = 'DEBIT',
  Credit = 'CREDIT',
}

export enum TransactionCategory {
  Opening = 'OPENING',
  Withdrawal = 'WITHDRAWAL',
  Deposit = 'DEPOSIT',
  Reversal = 'REVERSAL',
  Payment = 'PAYMENT',
  Bill = 'BILL',
  Transfer = 'TRANSFER',
  Loan = 'LOAN',
}

export enum TransactionChannel {
  App = 'APP',
  Card = 'CARD',
  Ussd = 'USSD',
}

export interface SimulationTransaction {
  _id: string;
  created_at: string;
  updated_at: string;
  amount: number;
  balance: number;
  time: string;
  holder: string;
  holder_bank: string;
  related: string;
  related_bank: string;
  latitude: number;
  longitude: number;
  status: TransactionStatus;
  type: TransactionType;
  category: TransactionCategory;
  channel: TransactionChannel;
  device: string;
  reference: string;
  reported: boolean;
  simulation_id: string;
}

export interface TransactionsAnalysis {
  numerical: Record<string, number>;
  categorical: Record<string, Record<string, number>>;
  volumns: Record<string, number>;
  proportions: Record<string, Record<string, number>>;
}

export interface TransactionQueryParams {
  simulation_id: string;
  limit?: number;
  skip?: number;
  sort?: 'asc' | 'desc';
  query?: string | null;
  status?: TransactionStatus | null;
  type?: TransactionType | null;
  category?: TransactionCategory | null;
  channel?: TransactionChannel | null;
  reported?: boolean | null;
}