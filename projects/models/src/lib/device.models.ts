export type DeviceType = 'ATM' | 'MOBILE';

export interface SimulationDevice {
  _id: string;
  created_at: string;
  updated_at: string;
  device_id: string;
  owner: string;
  type: DeviceType;
  latitude: number;
  longitude: number;
  simulation_id: string;
}

export interface DeviceQueryParams {
  simulation_id: string;
  limit?: number;
  skip?: number;
  sort?: 'asc' | 'desc';
  query?: string | null;
}