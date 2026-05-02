import { Injectable, inject, signal } from '@angular/core';
import { DeviceService } from 'api';
import { ToastService } from 'ui';
import { SimulationDevice, DeviceQueryParams } from 'models';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceStore {
  private readonly deviceService = inject(DeviceService);
  private readonly toastService = inject(ToastService);
  readonly pagination = new PaginationService();

  private readonly _devices = signal<SimulationDevice[]>([]);
  private readonly _isLoading = signal(false);

  readonly devices = this._devices.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  fetchDevices(simulationId: string, page?: number, pageSize?: number): void {
    if (this._isLoading()) return;

    const currentPage = page ?? this.pagination.page();
    const currentPageSize = pageSize ?? this.pagination.pageSize();
    const skip = (currentPage - 1) * currentPageSize;
    this._isLoading.set(true);

    const params: DeviceQueryParams = {
      simulation_id: simulationId,
      limit: currentPageSize,
      skip,
    };

    this.deviceService.getDevices(params).subscribe({
      next: (response) => {
        this._isLoading.set(false);
        if (response.success && response.data) {
          this._devices.set(response.data);
          this.pagination.update(response, currentPage, currentPageSize);
        } else {
          this.toastService.error(response.message ?? 'Failed to load devices');
        }
      },
      error: (err) => {
        this._isLoading.set(false);
        this.toastService.error(err.error?.message ?? 'Failed to load devices. Please try again.');
      },
    });
  }

  setPageSize(simulationId: string, size: number): void {
    this.pagination.setPageSize(size);
    this.fetchDevices(simulationId, 1, size);
  }

  reset(): void {
    this._devices.set([]);
    this.pagination.reset(20);
  }
}