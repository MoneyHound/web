import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SimulationIndividual,
  IndividualQueryParams,
  PageResponse,
  APP_CONFIG,
} from 'models';

@Injectable({
  providedIn: 'root',
})
export class IndividualService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getIndividuals(params: IndividualQueryParams): Observable<PageResponse<SimulationIndividual>> {
    let httpParams = new HttpParams()
      .set('simulation_id', params.simulation_id);

    if (params.limit) httpParams = httpParams.set('limit', params.limit);
    if (params.skip) httpParams = httpParams.set('skip', params.skip);
    if (params.sort) httpParams = httpParams.set('sort', params.sort);
    if (params.query) httpParams = httpParams.set('query', params.query);

    return this.http.get<PageResponse<SimulationIndividual>>(`${this.config.apiUrl}/simulation_individuals`, {
      params: httpParams,
      withCredentials: true,
    });
  }
}