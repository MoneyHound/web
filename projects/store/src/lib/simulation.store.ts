import { Injectable, inject, signal, computed } from '@angular/core';
import { SimulationService } from 'api';
import { ToastService } from 'ui';
import { Simulation, CreateSimulation, UpdateSimulation } from 'models';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root',
})
export class SimulationStore {
  private readonly simulationService = inject(SimulationService);
  private readonly toastService = inject(ToastService);
  readonly pagination = new PaginationService();

  private readonly _simulations = signal<Simulation[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _isCreating = signal(false);
  private readonly _simulation = signal<Simulation | null>(null);
  private readonly _isLoadingSimulation = signal(false);
  private readonly _isUpdating = signal(false);
  private readonly _isDeleting = signal(false);
  private readonly _isRerunning = signal(false);

  readonly simulations = this._simulations.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isCreating = this._isCreating.asReadonly();
  readonly hasSimulations = computed(() => this._simulations().length > 0);
  readonly simulation = this._simulation.asReadonly();
  readonly isLoadingSimulation = this._isLoadingSimulation.asReadonly();
  readonly isUpdating = this._isUpdating.asReadonly();
  readonly isDeleting = this._isDeleting.asReadonly();
  readonly isRerunning = this._isRerunning.asReadonly();

  fetchSimulations(page?: number, pageSize?: number): void {
    if (this._isLoading()) return;

    const currentPage = page ?? this.pagination.page();
    const currentPageSize = pageSize ?? this.pagination.pageSize();
    const skip = (currentPage - 1) * currentPageSize;
    this._isLoading.set(true);

    this.simulationService.getSimulations({ limit: currentPageSize, skip }).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data) {
          this._simulations.set(response.data);
          this.pagination.update(response, currentPage, currentPageSize);
        } else {
          this.toastService.error(response.message ?? 'Failed to load simulations');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to load simulations. Please try again.');
      },
    });
  }

  setPageSize(size: number): void {
    this.pagination.setPageSize(size);
    this.fetchSimulations(1, size);
  }

  fetchSimulation(id: string): void {
    this._isLoadingSimulation.set(true);

    this.simulationService.getSimulation(id).subscribe({
      next: (response) => {
        this._isLoadingSimulation.set(false);
        if (response.success && response.data) {
          this._simulation.set(response.data);
        } else {
          this.toastService.error(response.message ?? 'Failed to load simulation');
        }
      },
      error: (err) => {
        this._isLoadingSimulation.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to load simulation. Please try again.');
      },
    });
  }

  createSimulation(data: CreateSimulation): void {
    this._isCreating.set(true);

    this.simulationService.createSimulation(data).subscribe({
      next: (response) => {
        this._isCreating.set(false);
        if (response.success && response.data) {
          this._simulations.update((sims) => [response.data!, ...sims]);
          this.toastService.success('Simulation created successfully');
        } else {
          this.toastService.error(response.message ?? 'Failed to create simulation');
        }
      },
      error: (err) => {
        this._isCreating.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to create simulation. Please try again.');
      },
    });
  }

  updateSimulation(id: string, data: UpdateSimulation): void {
    this._isUpdating.set(true);

    this.simulationService.updateSimulation(id, data).subscribe({
      next: (response) => {
        this._isUpdating.set(false);
        if (response.success && response.data) {
          this._simulation.set(response.data);
          this._simulations.update((sims) =>
            sims.map((sim) => (sim._id === id ? response.data! : sim))
          );
          this.toastService.success('Simulation updated successfully');
        } else {
          this.toastService.error(response.message ?? 'Failed to update simulation');
        }
      },
      error: (err) => {
        this._isUpdating.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to update simulation. Please try again.');
      },
    });
  }

  deleteSimulation(id: string): void {
    this._isDeleting.set(true);

    this.simulationService.deleteSimulation(id).subscribe({
      next: (response) => {
        this._isDeleting.set(false);
        if (response.success) {
          this._simulations.update((sims) => sims.filter((sim) => sim._id !== id));
          this._simulation.set(null);
          this.toastService.success('Simulation deleted successfully');
        } else {
          this.toastService.error(response.message ?? 'Failed to delete simulation');
        }
      },
      error: (err) => {
        this._isDeleting.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to delete simulation. Please try again.');
      },
    });
  }

  rerunSimulation(id: string): void {
    this._isRerunning.set(true);

    this.simulationService.rerunSimulation(id).subscribe({
      next: (response) => {
        this._isRerunning.set(false);
        if (response.success && response.data) {
          this._simulation.set(response.data);
          this._simulations.update((sims) =>
            sims.map((sim) => (sim._id === id ? response.data! : sim))
          );
          this.toastService.success('Simulation rerun started');
        } else {
          this.toastService.error(response.message ?? 'Failed to rerun simulation');
        }
      },
      error: (err) => {
        this._isRerunning.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to rerun simulation. Please try again.');
      },
    });
  }
}