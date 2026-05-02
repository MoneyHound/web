import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SimulationAccount,
  AccountQueryParams,
  PageResponse,
  APP_CONFIG,
} from 'models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getAccounts(params: AccountQueryParams): Observable<PageResponse<SimulationAccount>> {
    let httpParams = new HttpParams()
      .set('simulation_id', params.simulation_id);

    if (params.limit) httpParams = httpParams.set('limit', params.limit);
    if (params.skip) httpParams = httpParams.set('skip', params.skip);
    if (params.sort) httpParams = httpParams.set('sort', params.sort);
    if (params.query) httpParams = httpParams.set('query', params.query);

    return this.http.get<PageResponse<SimulationAccount>>(`${this.config.apiUrl}/simulation_accounts`, {
      params: httpParams,
      withCredentials: true,
    });
  }
}