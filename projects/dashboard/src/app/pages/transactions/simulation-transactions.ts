import { Component, input, inject, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TransactionStore } from 'store';

@Component({
  selector: 'mh-simulation-transactions',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './simulation-transactions.html',
  styleUrl: './simulation-transactions.scss',
})
export class MhSimulationTransactions implements OnInit {
  private readonly transactionStore = inject(TransactionStore);

  readonly simulationId = input.required<string>();

  readonly transactions = this.transactionStore.transactions;
  readonly isLoading = this.transactionStore.isLoading;
  readonly pagination = this.transactionStore.pagination;

  readonly pageSizes = [10, 20, 50, 100];

  private loaded = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.transactionStore.fetchTransactions(this.simulationId());
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages()) return;
    this.transactionStore.fetchTransactions(this.simulationId(), page);
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const size = Number(select.value);
    this.transactionStore.setPageSize(this.simulationId(), size);
  }
}