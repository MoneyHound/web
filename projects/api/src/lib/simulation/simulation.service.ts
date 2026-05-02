import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulation, CreateSimulation, UpdateSimulation, DataResponse, PageResponse, APP_CONFIG, TransactionsAnalysis } from 'models';

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

  getSimulation(id: string): Observable<DataResponse<Simulation>> {
    return this.http.get<DataResponse<Simulation>>(`${this.config.apiUrl}/simulations/${id}`, {
      withCredentials: true,
    });
  }

  createSimulation(data: CreateSimulation): Observable<DataResponse<Simulation>> {
    return this.http.post<DataResponse<Simulation>>(`${this.config.apiUrl}/simulations`, data, {
      withCredentials: true,
    });
  }

  updateSimulation(id: string, data: UpdateSimulation): Observable<DataResponse<Simulation>> {
    return this.http.patch<DataResponse<Simulation>>(`${this.config.apiUrl}/simulations/${id}`, data, {
      withCredentials: true,
    });
  }

  deleteSimulation(id: string): Observable<DataResponse<null>> {
    return this.http.delete<DataResponse<null>>(`${this.config.apiUrl}/simulations/${id}`, {
      withCredentials: true,
    });
  }

  rerunSimulation(id: string): Observable<DataResponse<Simulation>> {
    return this.http.post<DataResponse<Simulation>>(`${this.config.apiUrl}/simulations/${id}/rerun`, null, {
      withCredentials: true,
    });
  }

  analyzeSimulation(id: string): Observable<DataResponse<TransactionsAnalysis>> {
    return this.http.get<DataResponse<TransactionsAnalysis>>(`${this.config.apiUrl}/simulations/${id}/analyze`, {
      withCredentials: true,
    });
  }
}