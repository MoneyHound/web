import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MhSimulationIndividuals } from './simulation-individuals';
import { IndividualStore, PaginationService } from 'store';
import { SimulationIndividual } from 'models';

const mockIndividuals: SimulationIndividual[] = [
  {
    _id: 'ind1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    user_id: 'USER_001',
    name: 'John Doe',
    gender: 'Male',
    email: 'john@example.com',
    birthdate: '1990-05-15T00:00:00Z',
    devices: ['DEV_001', 'DEV_002'],
    latitude: 6.5244,
    longitude: 3.3792,
    simulation_id: 'sim1',
  },
  {
    _id: 'ind2',
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z',
    user_id: 'USER_002',
    name: 'Jane Smith',
    gender: 'Female',
    email: 'jane@example.com',
    birthdate: '1985-03-22T00:00:00Z',
    devices: ['DEV_003'],
    latitude: 6.6000,
    longitude: 3.5000,
    simulation_id: 'sim1',
  },
];

function createStoreMock(overrides: Record<string, unknown> = {}) {
  const pagination = new PaginationService();
  (pagination as any)._totalPages.set(3);
  (pagination as any)._hasMore.set(true);

  return {
    individuals: vi.fn(() => mockIndividuals),
    isLoading: vi.fn(() => false),
    fetchIndividuals: vi.fn(),
    setPageSize: vi.fn(),
    pagination,
    ...overrides,
  };
}

describe('MhSimulationIndividuals', () => {
  let mock: ReturnType<typeof createStoreMock>;
  let fixture: ComponentFixture<MhSimulationIndividuals>;

  beforeEach(() => {
    mock = createStoreMock();

    TestBed.configureTestingModule({
      imports: [MhSimulationIndividuals],
      providers: [{ provide: IndividualStore, useValue: mock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MhSimulationIndividuals);
    fixture.componentRef.setInput('simulationId', 'sim1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should fetch individuals on init', () => {
    expect(mock.fetchIndividuals).toHaveBeenCalledWith('sim1');
  });

  it('should display user IDs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('USER_001');
    expect(compiled.textContent).toContain('USER_002');
  });

  it('should display names', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('Jane Smith');
  });

  it('should display emails', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('john@example.com');
    expect(compiled.textContent).toContain('jane@example.com');
  });

  it('should display gender badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Male');
    expect(compiled.textContent).toContain('Female');
  });

  it('should display device counts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2');
    expect(compiled.textContent).toContain('1');
  });

  it('should display page info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Page 1 of 3');
  });

  it('should display page size selector', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Per page');
  });

  it('should not fetch again if load is called twice', () => {
    fixture.componentInstance.load();
    expect(mock.fetchIndividuals).toHaveBeenCalledTimes(1);
  });

  it('should call fetchIndividuals with page on goToPage', () => {
    fixture.componentInstance.goToPage(2);
    expect(mock.fetchIndividuals).toHaveBeenCalledWith('sim1', 2);
  });

  it('should not go to page less than 1', () => {
    fixture.componentInstance.goToPage(0);
    expect(mock.fetchIndividuals).toHaveBeenCalledTimes(1);
  });

  it('should call setPageSize on onPageSizeChange', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: '50' } });
    fixture.componentInstance.onPageSizeChange(event);
    expect(mock.setPageSize).toHaveBeenCalledWith('sim1', 50);
  });
});

describe('MhSimulationIndividuals edge cases', () => {
  it('should show loading state when loading with no individuals', () => {
    const pagination = new PaginationService();
    const mock = createStoreMock({
      individuals: vi.fn(() => []),
      isLoading: vi.fn(() => true),
      pagination,
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationIndividuals],
      providers: [{ provide: IndividualStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationIndividuals);
    fixture.componentRef.setInput('simulationId', 'sim2');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading individuals');
  });

  it('should show empty state when no individuals and not loading', () => {
    const pagination = new PaginationService();
    const mock = createStoreMock({
      individuals: vi.fn(() => []),
      isLoading: vi.fn(() => false),
      pagination,
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationIndividuals],
      providers: [{ provide: IndividualStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationIndividuals);
    fixture.componentRef.setInput('simulationId', 'sim3');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No individuals yet');
  });
});