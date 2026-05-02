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
  readonly hasMore = this.simulationStore.hasMore;

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

  loadMore(): void {
    this.simulationStore.fetchSimulations(true);
  }
}