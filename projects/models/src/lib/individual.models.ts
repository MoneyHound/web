export interface SimulationIndividual {
  _id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  gender: string;
  email: string;
  birthdate: string;
  devices: string[];
  latitude: number;
  longitude: number;
  simulation_id: string;
}

export interface IndividualQueryParams {
  simulation_id: string;
  limit?: number;
  skip?: number;
  sort?: 'asc' | 'desc';
  query?: string | null;
}