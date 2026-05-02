import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Simulations } from './simulations';
import { SimulationStore } from 'store';
import { Simulation, SimulationStatus } from 'models';
import { MhButton, MhSimulationCard, PopupService } from 'ui';
import { provideRouter } from '@angular/router';
import { PaginationService } from 'store';

const mockSimulation: Simulation = {
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

function createStoreMock(sims: Simulation[] = [], more = false) {
  const pagination = new PaginationService();
  if (more) {
    (pagination as any)._hasMore.set(true);
    (pagination as any)._totalPages.set(3);
  }

  return {
    simulations: vi.fn(() => sims),
    isLoading: vi.fn(() => false),
    isCreating: vi.fn(() => false),
    hasSimulations: vi.fn(() => sims.length > 0),
    fetchSimulations: vi.fn(),
    createSimulation: vi.fn(),
    setPageSize: vi.fn(),
    pagination,
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
  it('should show simulation cards when simulations exist', () => {
    const mock = createStoreMock([mockSimulation]);
    const fixture = setupSimulations(mock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-simulation-card')).not.toBeNull();
  });

  it('should show page info when simulations exist', () => {
    const mock = createStoreMock([mockSimulation]);
    const fixture = setupSimulations(mock);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Page 1 of');
  });

  it('should call fetchSimulations with page on goToPage', () => {
    const mock = createStoreMock([mockSimulation], true);
    const fixture = setupSimulations(mock);
    fixture.componentInstance.goToPage(2);
    expect(mock.fetchSimulations).toHaveBeenCalledWith(2);
  });

  it('should not go to page less than 1', () => {
    const mock = createStoreMock([mockSimulation], true);
    const fixture = setupSimulations(mock);
    fixture.componentInstance.goToPage(0);
    expect(mock.fetchSimulations).toHaveBeenCalledTimes(1); // only init
  });

  it('should call setPageSize on onPageSizeChange', () => {
    const mock = createStoreMock([mockSimulation]);
    const fixture = setupSimulations(mock);
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: '24' } });
    fixture.componentInstance.onPageSizeChange(event);
    expect(mock.setPageSize).toHaveBeenCalledWith(24);
  });
});