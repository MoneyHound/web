import { Injectable, inject, signal } from '@angular/core';
import { AccountService } from 'api';
import { ToastService } from 'ui';
import { SimulationAccount, AccountQueryParams } from 'models';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root',
})
export class AccountStore {
  private readonly accountService = inject(AccountService);
  private readonly toastService = inject(ToastService);
  readonly pagination = new PaginationService();

  private readonly _accounts = signal<SimulationAccount[]>([]);
  private readonly _isLoading = signal(false);

  readonly accounts = this._accounts.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  fetchAccounts(simulationId: string, page?: number, pageSize?: number): void {
    if (this._isLoading()) return;

    const currentPage = page ?? this.pagination.page();
    const currentPageSize = pageSize ?? this.pagination.pageSize();
    const skip = (currentPage - 1) * currentPageSize;
    this._isLoading.set(true);

    const params: AccountQueryParams = {
      simulation_id: simulationId,
      limit: currentPageSize,
      skip,
    };

    this.accountService.getAccounts(params).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data) {
          console.log('Fetched accounts:', response.data);
          this._accounts.set(response.data);
          this.pagination.update(response, currentPage, currentPageSize);
        } else {
          this.toastService.error(response.message ?? 'Failed to load accounts');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to load accounts. Please try again.');
      },
    });
  }

  setPageSize(simulationId: string, size: number): void {
    this.pagination.setPageSize(size);
    this.fetchAccounts(simulationId, 1, size);
  }

  reset(): void {
    this._accounts.set([]);
    this.pagination.reset(20);
  }
}