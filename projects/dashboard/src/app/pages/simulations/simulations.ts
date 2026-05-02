import { Component, inject } from '@angular/core';
import { SimulationStore } from 'store';
import { MhButton, MhSimulationCard, PopupService } from 'ui';
import { CreateSimulation } from './create/create-simulation';

@Component({
  selector: 'app-simulations',
  imports: [MhButton, MhSimulationCard],
  templateUrl: './simulations.html',
  styleUrl: './simulations.scss',
})
export class Simulations {
  protected readonly simulationStore = inject(SimulationStore);
  private readonly popupService = inject(PopupService);

  readonly isLoading = this.simulationStore.isLoading;
  readonly simulations = this.simulationStore.simulations;
  readonly hasSimulations = this.simulationStore.hasSimulations;
  readonly pagination = this.simulationStore.pagination;

  readonly pageSizes = [6, 12, 24, 48];

  constructor() {
    this.simulationStore.fetchSimulations();
  }

  openForm(): void {
    this.popupService.open({
      title: 'Generate Simulation',
      type: 'info',
      component: CreateSimulation,
      wide: true,
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages()) return;
    this.simulationStore.fetchSimulations(page);
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const size = Number(select.value);
    this.simulationStore.setPageSize(size);
  }
}