import { Injectable, inject, signal } from '@angular/core';
import { IndividualService } from 'api';
import { ToastService } from 'ui';
import { SimulationIndividual, IndividualQueryParams } from 'models';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root',
})
export class IndividualStore {
  private readonly individualService = inject(IndividualService);
  private readonly toastService = inject(ToastService);
  readonly pagination = new PaginationService();

  private readonly _individuals = signal<SimulationIndividual[]>([]);
  private readonly _isLoading = signal(false);

  readonly individuals = this._individuals.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  fetchIndividuals(simulationId: string, page?: number, pageSize?: number): void {
    if (this._isLoading()) return;

    const currentPage = page ?? this.pagination.page();
    const currentPageSize = pageSize ?? this.pagination.pageSize();
    const skip = (currentPage - 1) * currentPageSize;
    this._isLoading.set(true);

    const params: IndividualQueryParams = {
      simulation_id: simulationId,
      limit: currentPageSize,
      skip,
    };

    this.individualService.getIndividuals(params).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data) {
          this._individuals.set(response.data);
          this.pagination.update(response, currentPage, currentPageSize);
        } else {
          this.toastService.error(response.message ?? 'Failed to load individuals');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to load individuals. Please try again.');
      },
    });
  }

  setPageSize(simulationId: string, size: number): void {
    this.pagination.setPageSize(size);
    this.fetchIndividuals(simulationId, 1, size);
  }

  reset(): void {
    this._individuals.set([]);
    this.pagination.reset(20);
  }
}