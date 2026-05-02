import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SimulationStore } from 'store';
import { MhButton, PopupService } from 'ui';
import { UpdateSimulation } from '../update/update-simulation';

@Component({
  selector: 'app-view-simulation',
  standalone: true,
  imports: [DatePipe, RouterLink, MhButton],
  templateUrl: './view-simulation.html',
  styleUrl: './view-simulation.scss',
})
export class ViewSimulation {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly simulationStore = inject(SimulationStore);
  private readonly popupService = inject(PopupService);

  readonly simulation = this.simulationStore.simulation;
  readonly isLoading = this.simulationStore.isLoadingSimulation;
  readonly isRerunning = this.simulationStore.isRerunning;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.simulationStore.fetchSimulation(id);
    }
  }

  openEditForm(): void {
    this.popupService.open({
      title: 'Update Simulation',
      type: 'info',
      component: UpdateSimulation,
      wide: true,
    });
  }

  rerunSimulation(): void {
    const id = this.simulation()?._id;
    if (!id) return;

    this.popupService.open({
      title: 'Rerun Simulation',
      type: 'warning',
      message: 'Are you sure you want to rerun this simulation? This will regenerate all transaction data.',
      actions: [
        { label: 'Cancel', type: 'secondary', action: () => this.popupService.close() },
        {
          label: 'Rerun',
          type: 'primary',
          action: () => {
            this.popupService.close();
            this.simulationStore.rerunSimulation(id);
          },
        },
      ],
    });
  }

  confirmDelete(): void {
    const id = this.simulation()?._id;
    if (!id) return;

    this.popupService.open({
      title: 'Delete Simulation',
      type: 'warning',
      message: 'Are you sure you want to delete this simulation? This action cannot be undone.',
      actions: [
        { label: 'Cancel', type: 'secondary', action: () => this.popupService.close() },
        {
          label: 'Delete',
          type: 'primary',
          action: () => {
            this.popupService.close();
            this.simulationStore.deleteSimulation(id);
            this.router.navigate(['/simulations']);
          },
        },
      ],
    });
  }
}