export enum SimulationStatus {
  Pending = 'PENDING',
  Complete = 'COMPLETE',
  Failed = 'FAILED',
}

export interface Simulation {
  _id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string | null;
  num_banks: number;
  min_num_user: number;
  fraudulence: number;
  latitude: number;
  longitude: number;
  radius: number;
  min_amount: number;
  max_amount: number;
  author_id: string;
  status: SimulationStatus;
  days: number;
}

export interface CreateSimulation {
  title: string;
  description?: string | null;
  num_banks: number;
  min_num_user: number;
  latitude: number;
  longitude: number;
  radius?: number;
  fraudulence?: number | null;
  min_amount?: number | null;
  max_amount?: number | null;
  days?: number | null;
}