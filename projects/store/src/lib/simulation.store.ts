import { Injectable, inject, signal, computed } from '@angular/core';
import { SimulationService } from 'api';
import { ToastService } from 'ui';
import { Simulation, CreateSimulation } from 'models';

@Injectable({
  providedIn: 'root',
})
export class SimulationStore {
  private readonly simulationService = inject(SimulationService);
  private readonly toastService = inject(ToastService);

  private readonly _simulations = signal<Simulation[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _isCreating = signal(false);
  private readonly _hasMore = signal(true);
  private readonly _skip = signal(0);
  private readonly _limit = 10;

  readonly simulations = this._simulations.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isCreating = this._isCreating.asReadonly();
  readonly hasMore = this._hasMore.asReadonly();
  readonly hasSimulations = computed(() => this._simulations().length > 0);

  fetchSimulations(next: boolean = false): void {
    if (this._isLoading() || !this._hasMore()) return;

    console.log('Fetching simulations, next:', next);

    const page = this._skip() + (next ? this._limit : 0)
    this._skip.set(page);
    this._isLoading.set(true);

    this.simulationService.getSimulations({ limit: this._limit, skip: page }).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data) {
          this._simulations.set(response.data);
          this._hasMore.set(response.has_more);
          this._skip.set(response.skip + response.data.length);
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
}