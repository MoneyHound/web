import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { CreateSimulation } from './create-simulation';
import { SimulationStore } from 'store';
import { MhButton, MhFormGroup, MhInput, MhTextarea, PopupService } from 'ui';
import { provideRouter } from '@angular/router';

function createStoreMock() {
  return {
    simulations: vi.fn(() => []),
    isLoading: vi.fn(() => false),
    isCreating: vi.fn(() => false),
    hasSimulations: vi.fn(() => false),
    hasMore: vi.fn(() => false),
    fetchSimulations: vi.fn(),
    createSimulation: vi.fn(),
    loadMore: vi.fn(),
  };
}

function setupCreateSimulation(mock: ReturnType<typeof createStoreMock>) {
  TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, MhButton, MhFormGroup, MhInput, MhTextarea, CreateSimulation],
    providers: [
      provideRouter([]),
      { provide: SimulationStore, useValue: mock },
      PopupService,
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(CreateSimulation);
  fixture.detectChanges();
  return fixture;
}

describe('CreateSimulation', () => {
  let mock: ReturnType<typeof createStoreMock>;
  let fixture: ComponentFixture<CreateSimulation>;

  beforeEach(() => {
    mock = createStoreMock();
    fixture = setupCreateSimulation(mock);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should close popup when onClose is called', () => {
    const popupService = TestBed.inject(PopupService);
    popupService.open({ title: 'Test', type: 'info', component: CreateSimulation });
    fixture.componentInstance.onClose();
    expect(popupService.popup()).toBeNull();
  });

  it('should close popup when form is submitted successfully', () => {
    const popupService = TestBed.inject(PopupService);
    popupService.open({ title: 'Test', type: 'info', component: CreateSimulation });

    const form = fixture.componentInstance.form;
    form.get('title')?.setValue('Test');
    form.get('num_banks')?.setValue(5);
    form.get('min_num_user')?.setValue(20);
    form.get('latitude')?.setValue(6.5);
    form.get('longitude')?.setValue(3.4);

    fixture.componentInstance.onSubmit();
    expect(popupService.popup()).toBeNull();
  });

  it('should not call createSimulation when form is invalid', () => {
    const form = fixture.componentInstance.form;
    form.get('title')?.setValue(null);
    fixture.componentInstance.onSubmit();
    expect(mock.createSimulation).not.toHaveBeenCalled();
  });

  it('should call createSimulation with correct data on valid submit', () => {
    const form = fixture.componentInstance.form;
    form.get('title')?.setValue('Test Sim');
    form.get('num_banks')?.setValue(5);
    form.get('min_num_user')?.setValue(20);
    form.get('latitude')?.setValue(6.5);
    form.get('longitude')?.setValue(3.4);
    form.get('radius')?.setValue(5000);
    form.get('fraudulence')?.setValue(0.1);
    form.get('days')?.setValue(14);

    fixture.componentInstance.onSubmit();

    expect(mock.createSimulation).toHaveBeenCalledWith({
      title: 'Test Sim',
      description: null,
      num_banks: 5,
      min_num_user: 20,
      latitude: 6.5,
      longitude: 3.4,
      radius: 5000,
      fraudulence: 0.1,
      min_amount: 100,
      max_amount: 100000000000,
      days: 14,
    });
  });

  it('should be invalid with empty title', () => {
    const form = fixture.componentInstance.form;
    form.get('title')?.setValue(null);
    expect(form.get('title')?.errors?.['required']).toBeTruthy();
  });

  it('should be invalid with empty latitude', () => {
    const form = fixture.componentInstance.form;
    form.get('latitude')?.setValue(null);
    expect(form.get('latitude')?.errors?.['required']).toBeTruthy();
  });
});