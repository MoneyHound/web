import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ViewSimulation } from './view-simulation';
import { SimulationStore, TransactionStore } from 'store';
import { Simulation, SimulationStatus } from 'models';
import { MhButton, PopupService } from 'ui';
import { provideRouter } from '@angular/router';

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

function createSimulationStoreMock() {
  return {
    simulation: vi.fn(() => mockSimulation),
    isLoadingSimulation: vi.fn(() => false),
    isRerunning: vi.fn(() => false),
    fetchSimulation: vi.fn(),
    updateSimulation: vi.fn(),
    deleteSimulation: vi.fn(),
    rerunSimulation: vi.fn(),
  };
}

function createTransactionStoreMock() {
  return {
    transactions: vi.fn(() => []),
    isLoading: vi.fn(() => false),
    hasMore: vi.fn(() => false),
    analysis: vi.fn(() => null),
    isLoadingAnalysis: vi.fn(() => false),
    fetchTransactions: vi.fn(),
    fetchAnalysis: vi.fn(),
  };
}

type SimulationStoreMock = ReturnType<typeof createSimulationStoreMock>;

describe('ViewSimulation', () => {
  let mock: SimulationStoreMock;
  let fixture: ComponentFixture<ViewSimulation>;
  let popupService: PopupService;

  beforeEach(() => {
    mock = createSimulationStoreMock();

    TestBed.configureTestingModule({
      imports: [MhButton, ViewSimulation],
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'sim1' } } },
        },
        { provide: SimulationStore, useValue: mock },
        { provide: TransactionStore, useValue: createTransactionStoreMock() },
        PopupService,
      ],
    }).compileComponents();

    popupService = TestBed.inject(PopupService);
    fixture = TestBed.createComponent(ViewSimulation);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should fetch simulation on init', () => {
    expect(mock.fetchSimulation).toHaveBeenCalledWith('sim1');
  });

  it('should display simulation title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Sim');
  });

  it('should display simulation description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('A test simulation');
  });

  it('should display simulation fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('7 days');
    expect(compiled.textContent).toContain('3');
    expect(compiled.textContent).toContain('10');
    expect(compiled.textContent).toContain('0.05');
    expect(compiled.textContent).toContain('COMPLETE');
  });

  it('should display tabs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('overview');
    expect(compiled.textContent).toContain('profiles');
    expect(compiled.textContent).toContain('devices');
    expect(compiled.textContent).toContain('banks');
  });

  it('should default to overview tab', () => {
    expect(fixture.componentInstance.activeTab).toBe('overview');
  });

  it('should switch active tab', () => {
    fixture.componentInstance.activeTab = 'profiles';
    expect(fixture.componentInstance.activeTab).toBe('profiles');
  });

  it('should show overview content on overview tab', () => {
    fixture.componentInstance.activeTab = 'overview';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Duration');
  });

  it('should open edit form popup when openEditForm is called', () => {
    fixture.componentInstance.openEditForm();
    expect(popupService.popup()).not.toBeNull();
    expect(popupService.popup()!.title).toBe('Update Simulation');
    expect(popupService.popup()!.type).toBe('info');
  });

  it('should open rerun confirmation popup when rerunSimulation is called', () => {
    fixture.componentInstance.rerunSimulation();
    expect(popupService.popup()).not.toBeNull();
    expect(popupService.popup()!.title).toBe('Rerun Simulation');
    expect(popupService.popup()!.type).toBe('warning');
    expect(popupService.popup()!.message).toContain('rerun');
  });

  it('should not open rerun popup when simulation is null', () => {
    mock.simulation.mockReturnValue(null as unknown as Simulation);
    fixture.componentInstance.rerunSimulation();
    expect(popupService.popup()).toBeNull();
  });

  it('should open delete confirmation popup when confirmDelete is called', () => {
    fixture.componentInstance.confirmDelete();
    expect(popupService.popup()).not.toBeNull();
    expect(popupService.popup()!.title).toBe('Delete Simulation');
    expect(popupService.popup()!.type).toBe('warning');
    expect(popupService.popup()!.message).toContain('delete');
  });

  it('should not open delete popup when simulation is null', () => {
    mock.simulation.mockReturnValue(null as unknown as Simulation);
    fixture.componentInstance.confirmDelete();
    expect(popupService.popup()).toBeNull();
  });

  it('should call rerunSimulation when rerun popup action is confirmed', () => {
    fixture.componentInstance.rerunSimulation();
    const popup = popupService.popup()!;
    const rerunAction = popup.actions!.find((a) => a.label === 'Rerun');
    rerunAction!.action!();
    expect(mock.rerunSimulation).toHaveBeenCalledWith('sim1');
  });

  it('should call deleteSimulation when delete popup action is confirmed', () => {
    fixture.componentInstance.confirmDelete();
    const popup = popupService.popup()!;
    const deleteAction = popup.actions!.find((a) => a.label === 'Delete');
    deleteAction!.action!();
    expect(mock.deleteSimulation).toHaveBeenCalledWith('sim1');
  });

  it('should close popup when cancel action is clicked in rerun popup', () => {
    fixture.componentInstance.rerunSimulation();
    const popup = popupService.popup()!;
    const cancelAction = popup.actions!.find((a) => a.label === 'Cancel');
    cancelAction!.action!();
    expect(popupService.popup()).toBeNull();
  });

  it('should close popup when cancel action is clicked in delete popup', () => {
    fixture.componentInstance.confirmDelete();
    const popup = popupService.popup()!;
    const cancelAction = popup.actions!.find((a) => a.label === 'Cancel');
    cancelAction!.action!();
    expect(popupService.popup()).toBeNull();
  });
});