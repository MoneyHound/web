import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MhSimulationAccounts } from './simulation-accounts';
import { AccountStore, PaginationService } from 'store';
import { SimulationAccount } from 'models';

const mockAccounts: SimulationAccount[] = [
  {
    _id: 'acc1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    account_no: 'ACC_0000000001',
    account_name: 'John Doe',
    bank_name: 'First Bank',
    balance: 50000,
    kyc: 2,
    bvn: 'BVN001',
    merchant: false,
    opening_device: 'DEV_001',
    simulation_id: 'sim1',
  },
  {
    _id: 'acc2',
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z',
    account_no: 'ACC_0000000002',
    account_name: 'Jane Smith',
    bank_name: 'GTBank',
    balance: 120000,
    kyc: 3,
    bvn: 'BVN002',
    merchant: true,
    opening_device: 'DEV_002',
    simulation_id: 'sim1',
  },
];

function createStoreMock(overrides: Record<string, unknown> = {}) {
  const pagination = new PaginationService();
  (pagination as any)._totalPages.set(3);
  (pagination as any)._hasMore.set(true);

  return {
    accounts: vi.fn(() => mockAccounts),
    isLoading: vi.fn(() => false),
    fetchAccounts: vi.fn(),
    setPageSize: vi.fn(),
    pagination,
    ...overrides,
  };
}

describe('MhSimulationAccounts', () => {
  let mock: ReturnType<typeof createStoreMock>;
  let fixture: ComponentFixture<MhSimulationAccounts>;

  beforeEach(() => {
    mock = createStoreMock();

    TestBed.configureTestingModule({
      imports: [MhSimulationAccounts],
      providers: [{ provide: AccountStore, useValue: mock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MhSimulationAccounts);
    fixture.componentRef.setInput('simulationId', 'sim1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should fetch accounts on init', () => {
    expect(mock.fetchAccounts).toHaveBeenCalledWith('sim1');
  });

  it('should display account numbers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('ACC_0000000001');
    expect(compiled.textContent).toContain('ACC_0000000002');
  });

  it('should display account names', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('Jane Smith');
  });

  it('should display bank names', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('First Bank');
    expect(compiled.textContent).toContain('GTBank');
  });

  it('should display balances', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('50,000');
    expect(compiled.textContent).toContain('120,000');
  });

  it('should display KYC badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('KYC 2');
    expect(compiled.textContent).toContain('KYC 3');
  });

  it('should display merchant badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Merchant');
    expect(compiled.textContent).toContain('Personal');
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
    expect(mock.fetchAccounts).toHaveBeenCalledTimes(1);
  });

  it('should call fetchAccounts with page on goToPage', () => {
    fixture.componentInstance.goToPage(2);
    expect(mock.fetchAccounts).toHaveBeenCalledWith('sim1', 2);
  });

  it('should not go to page less than 1', () => {
    fixture.componentInstance.goToPage(0);
    expect(mock.fetchAccounts).toHaveBeenCalledTimes(1);
  });

  it('should call setPageSize on onPageSizeChange', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: '50' } });
    fixture.componentInstance.onPageSizeChange(event);
    expect(mock.setPageSize).toHaveBeenCalledWith('sim1', 50);
  });
});

describe('MhSimulationAccounts edge cases', () => {
  it('should show loading state when loading with no accounts', () => {
    const pagination = new PaginationService();
    const mock = createStoreMock({
      accounts: vi.fn(() => []),
      isLoading: vi.fn(() => true),
      pagination,
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationAccounts],
      providers: [{ provide: AccountStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationAccounts);
    fixture.componentRef.setInput('simulationId', 'sim2');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading accounts');
  });

  it('should show empty state when no accounts and not loading', () => {
    const pagination = new PaginationService();
    const mock = createStoreMock({
      accounts: vi.fn(() => []),
      isLoading: vi.fn(() => false),
      pagination,
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationAccounts],
      providers: [{ provide: AccountStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationAccounts);
    fixture.componentRef.setInput('simulationId', 'sim3');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No accounts yet');
  });
});