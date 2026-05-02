import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SimulationDevice,
  DeviceQueryParams,
  PageResponse,
  APP_CONFIG,
} from 'models';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getDevices(params: DeviceQueryParams): Observable<PageResponse<SimulationDevice>> {
    let httpParams = new HttpParams()
      .set('simulation_id', params.simulation_id);

    if (params.limit) httpParams = httpParams.set('limit', params.limit);
    if (params.skip) httpParams = httpParams.set('skip', params.skip);
    if (params.sort) httpParams = httpParams.set('sort', params.sort);
    if (params.query) httpParams = httpParams.set('query', params.query);

    return this.http.get<PageResponse<SimulationDevice>>(`${this.config.apiUrl}/simulation_devices`, {
      params: httpParams,
      withCredentials: true,
    });
  }
}