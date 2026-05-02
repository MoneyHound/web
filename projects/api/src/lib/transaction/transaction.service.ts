import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SimulationTransaction,
  TransactionQueryParams,
  PageResponse,
  APP_CONFIG,
} from 'models';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getTransactions(params: TransactionQueryParams): Observable<PageResponse<SimulationTransaction>> {
    let httpParams = new HttpParams()
      .set('simulation_id', params.simulation_id);

    if (params.limit) httpParams = httpParams.set('limit', params.limit);
    if (params.skip) httpParams = httpParams.set('skip', params.skip);
    if (params.sort) httpParams = httpParams.set('sort', params.sort);
    if (params.query) httpParams = httpParams.set('query', params.query);
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.type) httpParams = httpParams.set('type', params.type);
    if (params.category) httpParams = httpParams.set('category', params.category);
    if (params.channel) httpParams = httpParams.set('channel', params.channel);
    if (params.reported !== null && params.reported !== undefined) {
      httpParams = httpParams.set('reported', params.reported);
    }

    return this.http.get<PageResponse<SimulationTransaction>>(`${this.config.apiUrl}/simulation_transactions`, {
      params: httpParams,
      withCredentials: true,
    });
  }
}