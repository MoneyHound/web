import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MhSimulationDevices } from './simulation-devices';
import { DeviceStore, PaginationService } from 'store';
import { SimulationDevice } from 'models';

const mockDevices: SimulationDevice[] = [
  {
    _id: 'dev1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    device_id: 'DEV_001',
    owner: 'First Bank',
    type: 'ATM',
    latitude: 6.5244,
    longitude: 3.3792,
    simulation_id: 'sim1',
  },
  {
    _id: 'dev2',
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z',
    device_id: 'DEV_002',
    owner: 'GTBank',
    type: 'MOBILE',
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
    devices: vi.fn(() => mockDevices),
    isLoading: vi.fn(() => false),
    fetchDevices: vi.fn(),
    setPageSize: vi.fn(),
    pagination,
    ...overrides,
  };
}

describe('MhSimulationDevices', () => {
  let mock: ReturnType<typeof createStoreMock>;
  let fixture: ComponentFixture<MhSimulationDevices>;

  beforeEach(() => {
    mock = createStoreMock();

    TestBed.configureTestingModule({
      imports: [MhSimulationDevices],
      providers: [{ provide: DeviceStore, useValue: mock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MhSimulationDevices);
    fixture.componentRef.setInput('simulationId', 'sim1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should fetch devices on init', () => {
    expect(mock.fetchDevices).toHaveBeenCalledWith('sim1');
  });

  it('should display device IDs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('DEV_001');
    expect(compiled.textContent).toContain('DEV_002');
  });

  it('should display device owners', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('First Bank');
    expect(compiled.textContent).toContain('GTBank');
  });

  it('should display type badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('ATM');
    expect(compiled.textContent).toContain('MOBILE');
  });

  it('should display coordinates', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('6.5244');
    expect(compiled.textContent).toContain('3.3792');
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
    expect(mock.fetchDevices).toHaveBeenCalledTimes(1);
  });

  it('should call fetchDevices with page on goToPage', () => {
    fixture.componentInstance.goToPage(2);
    expect(mock.fetchDevices).toHaveBeenCalledWith('sim1', 2);
  });

  it('should not go to page less than 1', () => {
    fixture.componentInstance.goToPage(0);
    expect(mock.fetchDevices).toHaveBeenCalledTimes(1);
  });

  it('should call setPageSize on onPageSizeChange', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: '50' } });
    fixture.componentInstance.onPageSizeChange(event);
    expect(mock.setPageSize).toHaveBeenCalledWith('sim1', 50);
  });
});

describe('MhSimulationDevices edge cases', () => {
  it('should show loading state when loading with no devices', () => {
    const pagination = new PaginationService();
    const mock = createStoreMock({
      devices: vi.fn(() => []),
      isLoading: vi.fn(() => true),
      pagination,
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationDevices],
      providers: [{ provide: DeviceStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationDevices);
    fixture.componentRef.setInput('simulationId', 'sim2');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading devices');
  });

  it('should show empty state when no devices and not loading', () => {
    const pagination = new PaginationService();
    const mock = createStoreMock({
      devices: vi.fn(() => []),
      isLoading: vi.fn(() => false),
      pagination,
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationDevices],
      providers: [{ provide: DeviceStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationDevices);
    fixture.componentRef.setInput('simulationId', 'sim3');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No devices yet');
  });
});