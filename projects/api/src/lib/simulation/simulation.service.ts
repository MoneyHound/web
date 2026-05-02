import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulation, CreateSimulation, DataResponse, PageResponse, APP_CONFIG } from 'models';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getSimulations(params?: { limit?: number; skip?: number }): Observable<PageResponse<Simulation>> {
    let httpParams = new HttpParams();
    if (params?.limit) httpParams = httpParams.set('limit', params.limit);
    if (params?.skip) httpParams = httpParams.set('skip', params.skip);

    return this.http.get<PageResponse<Simulation>>(`${this.config.apiUrl}/simulations`, {
      params: httpParams,
      withCredentials: true,
    });
  }

  createSimulation(data: CreateSimulation): Observable<DataResponse<Simulation>> {
    return this.http.post<DataResponse<Simulation>>(`${this.config.apiUrl}/simulations`, data, {
      withCredentials: true,
    });
  }
}