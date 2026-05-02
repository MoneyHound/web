import { Component, input, inject, OnInit } from '@angular/core';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { TransactionStore } from 'store';

@Component({
  selector: 'mh-simulation-analysis',
  standalone: true,
  imports: [DecimalPipe, KeyValuePipe],
  templateUrl: './simulation-analysis.html',
  styleUrl: './simulation-analysis.scss',
})
export class MhSimulationAnalysis implements OnInit {
  private readonly transactionStore = inject(TransactionStore);

  readonly simulationId = input.required<string>();

  readonly analysis = this.transactionStore.analysis;
  readonly isLoading = this.transactionStore.isLoadingAnalysis;

  ngOnInit(): void {
    this.load();
  }

  private loaded = false;

  load(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.transactionStore.fetchAnalysis(this.simulationId());
  }
}