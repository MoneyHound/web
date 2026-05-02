import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { UpdateSimulation } from './update-simulation';
import { SimulationStore } from 'store';
import { MhButton, MhFormGroup, MhInput, MhTextarea, PopupService } from 'ui';
import { Simulation, SimulationStatus } from 'models';

const mockSimulation: Simulation = {
  _id: 'sim1',
  title: 'Test Sim',
  description: 'A test simulation',
  num_banks: 3,
  min_num_user: 10,
  fraudulence: 0.05,
  latitude: 6.5244,
  longitude: 3.3792,
  radius: 10000,
  min_amount: 100,
  max_amount: 100000000000,
  author_id: 'user1',
  status: SimulationStatus.Complete,
  days: 7,
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
};

describe('UpdateSimulation', () => {
  let mock: {
    simulation: ReturnType<typeof vi.fn>;
    isUpdating: ReturnType<typeof vi.fn>;
    updateSimulation: ReturnType<typeof vi.fn>;
  };
  let fixture: ComponentFixture<UpdateSimulation>;
  let popupService: PopupService;

  beforeEach(() => {
    mock = {
      simulation: vi.fn(() => mockSimulation),
      isUpdating: vi.fn(() => false),
      updateSimulation: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MhButton, MhFormGroup, MhInput, MhTextarea, UpdateSimulation],
      providers: [
        { provide: SimulationStore, useValue: mock },
        PopupService,
      ],
    }).compileComponents();

    popupService = TestBed.inject(PopupService);
    fixture = TestBed.createComponent(UpdateSimulation);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should pre-populate form with simulation data', () => {
    const form = fixture.componentInstance.form;
    expect(form.get('title')?.value).toBe('Test Sim');
    expect(form.get('description')?.value).toBe('A test simulation');
    expect(form.get('num_banks')?.value).toBe(3);
    expect(form.get('min_num_user')?.value).toBe(10);
    expect(form.get('latitude')?.value).toBe(6.5244);
    expect(form.get('longitude')?.value).toBe(3.3792);
    expect(form.get('radius')?.value).toBe(10000);
    expect(form.get('fraudulence')?.value).toBe(0.05);
    expect(form.get('min_amount')?.value).toBe(100);
    expect(form.get('max_amount')?.value).toBe(100000000000);
    expect(form.get('days')?.value).toBe(7);
    expect(form.get('rerun')?.value).toBe(false);
  });

  it('should close popup when onClose is called', () => {
    popupService.open({ title: 'Test', type: 'info', component: UpdateSimulation });
    fixture.componentInstance.onClose();
    expect(popupService.popup()).toBeNull();
  });

  it('should not call updateSimulation when form is invalid', () => {
    const form = fixture.componentInstance.form;
    form.get('title')?.setValue('ab');
    form.get('title')?.markAsTouched();
    fixture.componentInstance.onSubmit();
    expect(mock.updateSimulation).not.toHaveBeenCalled();
  });

  it('should not call updateSimulation when simulation is null', () => {
    mock.simulation.mockReturnValue(null);
    // Force form to be valid before calling onSubmit
    const form = fixture.componentInstance.form;
    form.get('num_banks')?.setValue(5);
    fixture.componentInstance.onSubmit();
    expect(mock.updateSimulation).not.toHaveBeenCalled();
  });

  it('should call updateSimulation with correct data on valid submit', () => {
    const form = fixture.componentInstance.form;
    form.get('title')?.setValue('Updated Sim');
    form.get('description')?.setValue('Updated desc');
    form.get('num_banks')?.setValue(5);
    form.get('min_num_user')?.setValue(20);
    form.get('latitude')?.setValue(7.0);
    form.get('longitude')?.setValue(4.0);
    form.get('radius')?.setValue(5000);
    form.get('fraudulence')?.setValue(0.1);
    form.get('min_amount')?.setValue(200);
    form.get('max_amount')?.setValue(200000000000);
    form.get('days')?.setValue(14);
    form.get('rerun')?.setValue(true);

    popupService.open({ title: 'Test', type: 'info', component: UpdateSimulation });

    fixture.componentInstance.onSubmit();

    expect(mock.updateSimulation).toHaveBeenCalledWith('sim1', {
      title: 'Updated Sim',
      description: 'Updated desc',
      num_banks: 5,
      min_num_user: 20,
      latitude: 7.0,
      longitude: 4.0,
      radius: 5000,
      fraudulence: 0.1,
      min_amount: 200,
      max_amount: 200000000000,
      days: 14,
      rerun: true,
    });
    expect(popupService.popup()).toBeNull();
  });

  it('should convert empty title to null in payload', () => {
    const form = fixture.componentInstance.form;
    form.get('title')?.setValue('');
    form.get('description')?.setValue('');

    popupService.open({ title: 'Test', type: 'info', component: UpdateSimulation });

    fixture.componentInstance.onSubmit();

    const callArgs = mock.updateSimulation.mock.calls[0][1];
    expect(callArgs.title).toBeNull();
    expect(callArgs.description).toBeNull();
    expect(popupService.popup()).toBeNull();
  });

  it('should send rerun as false when checkbox is unchecked', () => {
    const form = fixture.componentInstance.form;
    form.get('rerun')?.setValue(false);

    popupService.open({ title: 'Test', type: 'info', component: UpdateSimulation });

    fixture.componentInstance.onSubmit();

    const callArgs = mock.updateSimulation.mock.calls[0][1];
    expect(callArgs.rerun).toBe(false);
    expect(popupService.popup()).toBeNull();
  });
});