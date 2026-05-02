import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimulationStore } from 'store';
import { MhButton, MhFormGroup, MhInput, MhTextarea, PopupService } from 'ui';

@Component({
  selector: 'app-create-simulation',
  imports: [ReactiveFormsModule, MhButton, MhFormGroup, MhInput, MhTextarea],
  templateUrl: './create-simulation.html',
  styleUrl: './create-simulation.scss',
})
export class CreateSimulation {
  private readonly fb = inject(FormBuilder);
  private readonly simulationStore = inject(SimulationStore);
  private readonly popupService = inject(PopupService);

  readonly isCreating = this.simulationStore.isCreating;

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(200)]],
    num_banks: [3, [Validators.required, Validators.min(1)]],
    min_num_user: [10, [Validators.required, Validators.min(1)]],
    latitude: [6.5244, [Validators.required]],
    longitude: [3.3792, [Validators.required]],
    radius: [10000, [Validators.min(1)]],
    fraudulence: [0.05, [Validators.min(0), Validators.max(1)]],
    min_amount: [100, [Validators.min(0)]],
    max_amount: [100000000000, [Validators.min(0)]],
    days: [7, [Validators.min(1)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    this.simulationStore.createSimulation({
      title: raw.title!,
      description: raw.description || null,
      num_banks: raw.num_banks!,
      min_num_user: raw.min_num_user!,
      latitude: raw.latitude!,
      longitude: raw.longitude!,
      radius: raw.radius ?? 10000,
      fraudulence: raw.fraudulence ?? 0.05,
      min_amount: raw.min_amount ?? 100,
      max_amount: raw.max_amount ?? 100000000000,
      days: raw.days ?? 7,
    });
    this.popupService.close();
  }

  onClose(): void {
    this.popupService.close();
  }
}