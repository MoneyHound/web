import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MhSimulationTransactions } from './simulation-transactions';
import { TransactionStore, PaginationService } from 'store';
import { SimulationTransaction, TransactionStatus, TransactionType, TransactionCategory, TransactionChannel } from 'models';

const mockTransactions: SimulationTransaction[] = [
  {
    _id: 'tx1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    amount: 5000,
    balance: 10000,
    time: '2024-01-15T10:00:00Z',
    holder: 'user1',
    holder_bank: 'Bank A',
    related: 'user2',
    related_bank: 'Bank B',
    latitude: 6.5,
    longitude: 3.4,
    status: TransactionStatus.Success,
    type: TransactionType.Debit,
    category: TransactionCategory.Payment,
    channel: TransactionChannel.App,
    device: 'iPhone',
    reference: 'ref1',
    reported: false,
    simulation_id: 'sim1',
  },
  {
    _id: 'tx2',
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z',
    amount: 2000,
    balance: 8000,
    time: '2024-01-16T14:00:00Z',
    holder: 'user3',
    holder_bank: 'Bank C',
    related: 'user4',
    related_bank: 'Bank A',
    latitude: 6.6,
    longitude: 3.5,
    status: TransactionStatus.Failed,
    type: TransactionType.Credit,
    category: TransactionCategory.Transfer,
    channel: TransactionChannel.Card,
    device: 'Android',
    reference: 'ref2',
    reported: true,
    simulation_id: 'sim1',
  },
];

function createStoreMock(overrides: Record<string, unknown> = {}) {
  const pagination = new PaginationService();
  (pagination as any)._totalPages.set(3);
  (pagination as any)._hasMore.set(true);

  return {
    transactions: vi.fn(() => mockTransactions),
    isLoading: vi.fn(() => false),
    fetchTransactions: vi.fn(),
    setPageSize: vi.fn(),
    pagination,
    ...overrides,
  };
}

describe('MhSimulationTransactions', () => {
  let mock: ReturnType<typeof createStoreMock>;
  let fixture: ComponentFixture<MhSimulationTransactions>;

  beforeEach(() => {
    mock = createStoreMock();

    TestBed.configureTestingModule({
      imports: [MhSimulationTransactions],
      providers: [{ provide: TransactionStore, useValue: mock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MhSimulationTransactions);
    fixture.componentRef.setInput('simulationId', 'sim1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should fetch transactions on init', () => {
    expect(mock.fetchTransactions).toHaveBeenCalledWith('sim1');
  });

  it('should display transaction data in the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('user1');
    expect(compiled.textContent).toContain('user2');
    expect(compiled.textContent).toContain('user3');
    expect(compiled.textContent).toContain('user4');
  });

  it('should display transaction amounts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('5,000');
    expect(compiled.textContent).toContain('2,000');
  });

  it('should display category badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('PAYMENT');
    expect(compiled.textContent).toContain('TRANSFER');
  });

  it('should display type badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('DEBIT');
    expect(compiled.textContent).toContain('CREDIT');
  });

  it('should display status badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('SUCCESS');
    expect(compiled.textContent).toContain('FAILED');
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
    expect(mock.fetchTransactions).toHaveBeenCalledTimes(1);
  });

  it('should call fetchTransactions with page on goToPage', () => {
    fixture.componentInstance.goToPage(2);
    expect(mock.fetchTransactions).toHaveBeenCalledWith('sim1', 2);
  });

  it('should not go to page less than 1', () => {
    fixture.componentInstance.goToPage(0);
    expect(mock.fetchTransactions).toHaveBeenCalledTimes(1);
  });

  it('should call setPageSize on onPageSizeChange', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: '50' } });
    fixture.componentInstance.onPageSizeChange(event);
    expect(mock.setPageSize).toHaveBeenCalledWith('sim1', 50);
  });
});

describe('MhSimulationTransactions edge cases', () => {
  it('should show loading state when loading with no transactions', () => {
    const pagination = new PaginationService();
    const mock = createStoreMock({
      transactions: vi.fn(() => []),
      isLoading: vi.fn(() => true),
      pagination,
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationTransactions],
      providers: [{ provide: TransactionStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationTransactions);
    fixture.componentRef.setInput('simulationId', 'sim2');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading transactions');
  });

  it('should show empty state when no transactions and not loading', () => {
    const pagination = new PaginationService();
    const mock = createStoreMock({
      transactions: vi.fn(() => []),
      isLoading: vi.fn(() => false),
      pagination,
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationTransactions],
      providers: [{ provide: TransactionStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationTransactions);
    fixture.componentRef.setInput('simulationId', 'sim3');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No transactions yet');
  });
});