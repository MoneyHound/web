import { Component, input, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AccountStore } from 'store';

@Component({
  selector: 'mh-simulation-accounts',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './simulation-accounts.html',
  styleUrl: './simulation-accounts.scss',
})
export class MhSimulationAccounts implements OnInit {
  private readonly accountStore = inject(AccountStore);

  readonly simulationId = input.required<string>();

  readonly accounts = this.accountStore.accounts;
  readonly isLoading = this.accountStore.isLoading;
  readonly pagination = this.accountStore.pagination;

  readonly pageSizes = [10, 20, 50, 100];

  private loaded = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.accountStore.fetchAccounts(this.simulationId());
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages()) return;
    this.accountStore.fetchAccounts(this.simulationId(), page);
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const size = Number(select.value);
    this.accountStore.setPageSize(this.simulationId(), size);
  }
}