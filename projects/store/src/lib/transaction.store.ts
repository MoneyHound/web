import { Injectable, inject, signal } from '@angular/core';
import { TransactionService } from 'api';
import { ToastService } from 'ui';
import { SimulationTransaction, TransactionsAnalysis, TransactionQueryParams } from 'models';
import { SimulationService } from 'api';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionStore {
  private readonly transactionService = inject(TransactionService);
  private readonly simulationService = inject(SimulationService);
  private readonly toastService = inject(ToastService);
  readonly pagination = new PaginationService();

  private readonly _transactions = signal<SimulationTransaction[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _analysis = signal<TransactionsAnalysis | null>(null);
  private readonly _isLoadingAnalysis = signal(false);

  readonly transactions = this._transactions.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly analysis = this._analysis.asReadonly();
  readonly isLoadingAnalysis = this._isLoadingAnalysis.asReadonly();

  fetchTransactions(simulationId: string, page?: number, pageSize?: number): void {
    if (this._isLoading()) return;

    const currentPage = page ?? this.pagination.page();
    const currentPageSize = pageSize ?? this.pagination.pageSize();
    const skip = (currentPage - 1) * currentPageSize;
    this._isLoading.set(true);

    const params: TransactionQueryParams = {
      simulation_id: simulationId,
      limit: currentPageSize,
      skip,
    };

    this.transactionService.getTransactions(params).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data) {
          this._transactions.set(response.data);
          this.pagination.update(response, currentPage, currentPageSize);
        } else {
          this.toastService.error(response.message ?? 'Failed to load transactions');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to load transactions. Please try again.');
      },
    });
  }

  setPageSize(simulationId: string, size: number): void {
    this.pagination.setPageSize(size);
    this.fetchTransactions(simulationId, 1, size);
  }

  fetchAnalysis(simulationId: string): void {
    this._isLoadingAnalysis.set(true);

    this.simulationService.analyzeSimulation(simulationId).subscribe({
      next: (response) => {
        this._isLoadingAnalysis.set(false);
        if (response.success && response.data) {
          this._analysis.set(response.data);
        } else {
          this.toastService.error(response.message ?? 'Failed to load analysis');
        }
      },
      error: (err) => {
        this._isLoadingAnalysis.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to load analysis. Please try again.');
      },
    });
  }

  reset(): void {
    this._transactions.set([]);
    this.pagination.reset(20);
  }
}