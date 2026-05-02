import { Component, input, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IndividualStore } from 'store';

@Component({
  selector: 'mh-simulation-individuals',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './simulation-individuals.html',
  styleUrl: './simulation-individuals.scss',
})
export class MhSimulationIndividuals implements OnInit {
  private readonly individualStore = inject(IndividualStore);

  readonly simulationId = input.required<string>();

  readonly individuals = this.individualStore.individuals;
  readonly isLoading = this.individualStore.isLoading;
  readonly pagination = this.individualStore.pagination;

  readonly pageSizes = [10, 20, 50, 100];

  private loaded = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.individualStore.fetchIndividuals(this.simulationId());
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages()) return;
    this.individualStore.fetchIndividuals(this.simulationId(), page);
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const size = Number(select.value);
    this.individualStore.setPageSize(this.simulationId(), size);
  }
}