import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Simulations } from './simulations';
import { SimulationStore } from 'store';
import { Simulation, SimulationStatus } from 'models';
import { MhButton, MhSimulationCard, PopupService } from 'ui';
import { provideRouter } from '@angular/router';

function createStoreMock(sims: Simulation[] = [], more = false) {
  return {
    simulations: vi.fn(() => sims),
    isLoading: vi.fn(() => false),
    isCreating: vi.fn(() => false),
    hasSimulations: vi.fn(() => sims.length > 0),
    hasMore: vi.fn(() => more),
    fetchSimulations: vi.fn(),
    createSimulation: vi.fn(),
    loadMore: vi.fn(),
  };
}

function setupSimulations(mock: ReturnType<typeof createStoreMock>) {
  TestBed.configureTestingModule({
    imports: [MhButton, MhSimulationCard, Simulations],
    providers: [
      provideRouter([]),
      { provide: SimulationStore, useValue: mock },
      PopupService,
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(Simulations);
  fixture.detectChanges();
  return fixture;
}

describe('Simulations', () => {
  let mock: ReturnType<typeof createStoreMock>;
  let fixture: ComponentFixture<Simulations>;

  beforeEach(() => {
    mock = createStoreMock();
    fixture = setupSimulations(mock);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should fetch simulations on init', () => {
    expect(mock.fetchSimulations).toHaveBeenCalled();
  });

  it('should show empty state when no simulations', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No simulations yet');
  });

  it('should open popup when Generate Simulation is clicked', () => {
    const popupService = TestBed.inject(PopupService);
    fixture.componentInstance.openForm();
    expect(popupService.popup()).not.toBeNull();
    expect(popupService.popup()!.title).toBe('Generate Simulation');
  });

  it('should show Generate Simulation button in header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button[mh-button]');
    const hasButton = Array.from(buttons).some((b) => b.textContent?.includes('Generate Simulation'));
    expect(hasButton).toBe(true);
  });
});

describe('Simulations with data', () => {
  const mockSim: Simulation = {
    _id: '1',
    title: 'Test Sim',
    description: null,
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

  it('should show simulation cards when simulations exist', () => {
    const mock = createStoreMock([mockSim]);
    const fixture = setupSimulations(mock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-simulation-card')).not.toBeNull();
  });

  it('should show Load More button when hasMore is true', () => {
    const mock = createStoreMock([mockSim], true);
    const fixture = setupSimulations(mock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Load More');
  });

  it('should call loadMore when Load More is clicked', () => {
    const mock = createStoreMock([mockSim], true);
    const fixture = setupSimulations(mock);
    fixture.componentInstance.loadMore();
    expect(mock.loadMore).toHaveBeenCalled();
  });
});