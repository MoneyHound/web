import { Component, input, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DeviceStore } from 'store';

@Component({
  selector: 'mh-simulation-devices',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './simulation-devices.html',
  styleUrl: './simulation-devices.scss',
})
export class MhSimulationDevices implements OnInit {
  private readonly deviceStore = inject(DeviceStore);

  readonly simulationId = input.required<string>();

  readonly devices = this.deviceStore.devices;
  readonly isLoading = this.deviceStore.isLoading;
  readonly pagination = this.deviceStore.pagination;

  readonly pageSizes = [10, 20, 50, 100];

  private loaded = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.deviceStore.fetchDevices(this.simulationId());
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages()) return;
    this.deviceStore.fetchDevices(this.simulationId(), page);
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const size = Number(select.value);
    this.deviceStore.setPageSize(this.simulationId(), size);
  }
}