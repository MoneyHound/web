import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimulationStore } from 'store';
import { MhButton, MhFormGroup, MhInput, MhTextarea, PopupService } from 'ui';

@Component({
  selector: 'app-update-simulation',
  imports: [ReactiveFormsModule, MhButton, MhFormGroup, MhInput, MhTextarea],
  templateUrl: './update-simulation.html',
  styleUrl: './update-simulation.scss',
})
export class UpdateSimulation {
  private readonly fb = inject(FormBuilder);
  private readonly simulationStore = inject(SimulationStore);
  private readonly popupService = inject(PopupService);

  readonly isUpdating = this.simulationStore.isUpdating;
  readonly simulation = this.simulationStore.simulation;

  readonly form = this.fb.group({
    title: [this.simulation()?.title ?? null, [Validators.minLength(3)]],
    description: [this.simulation()?.description ?? null, [Validators.maxLength(200)]],
    num_banks: [this.simulation()?.num_banks ?? null, [Validators.min(1)]],
    min_num_user: [this.simulation()?.min_num_user ?? null, [Validators.min(1)]],
    latitude: [this.simulation()?.latitude ?? null],
    longitude: [this.simulation()?.longitude ?? null],
    radius: [this.simulation()?.radius ?? null, [Validators.min(1)]],
    fraudulence: [this.simulation()?.fraudulence ?? null, [Validators.min(0), Validators.max(1)]],
    min_amount: [this.simulation()?.min_amount ?? null, [Validators.min(0)]],
    max_amount: [this.simulation()?.max_amount ?? null, [Validators.min(0)]],
    days: [this.simulation()?.days ?? null, [Validators.min(1)]],
    rerun: [false],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.simulation()?._id;
    if (!id) return;

    const raw = this.form.getRawValue();
    this.simulationStore.updateSimulation(id, {
      title: raw.title || null,
      description: raw.description || null,
      num_banks: raw.num_banks ?? null,
      min_num_user: raw.min_num_user ?? null,
      latitude: raw.latitude ?? null,
      longitude: raw.longitude ?? null,
      radius: raw.radius ?? null,
      fraudulence: raw.fraudulence ?? null,
      min_amount: raw.min_amount ?? null,
      max_amount: raw.max_amount ?? null,
      days: raw.days ?? null,
      rerun: raw.rerun ?? false,
    });
    this.popupService.close();
  }

  onClose(): void {
    this.popupService.close();
  }
}