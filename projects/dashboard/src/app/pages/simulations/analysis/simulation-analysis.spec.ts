import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MhSimulationAnalysis } from './simulation-analysis';
import { TransactionStore } from 'store';
import { TransactionsAnalysis } from 'models';

const mockAnalysis: TransactionsAnalysis = {
  numerical: {
    total_transactions: 500,
    total_amount: 1500000,
    avg_amount: 3000,
    min_amount: 100,
    max_amount: 50000,
  },
  categorical: {},
  volumns: {},
  proportions: {},
};

function createStoreMock(overrides: Record<string, unknown> = {}) {
  return {
    analysis: vi.fn(() => mockAnalysis),
    isLoadingAnalysis: vi.fn(() => false),
    fetchAnalysis: vi.fn(),
    ...overrides,
  };
}

describe('MhSimulationAnalysis', () => {
  let mock: ReturnType<typeof createStoreMock>;
  let fixture: ComponentFixture<MhSimulationAnalysis>;

  beforeEach(() => {
    mock = createStoreMock();

    TestBed.configureTestingModule({
      imports: [MhSimulationAnalysis],
      providers: [{ provide: TransactionStore, useValue: mock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MhSimulationAnalysis);
    fixture.componentRef.setInput('simulationId', 'sim1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should fetch analysis on init', () => {
    expect(mock.fetchAnalysis).toHaveBeenCalledWith('sim1');
  });

  it('should display analysis title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Numerical Summary');
  });

  it('should display analysis keys and values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('total_transactions');
    expect(compiled.textContent).toContain('1,500,000');
  });

  it('should not fetch again if load is called twice', () => {
    fixture.componentInstance.load();
    expect(mock.fetchAnalysis).toHaveBeenCalledTimes(1);
  });
});

describe('MhSimulationAnalysis edge cases', () => {
  it('should show loading state when loading', () => {
    const mock = createStoreMock({
      analysis: vi.fn(() => null as unknown as TransactionsAnalysis),
      isLoadingAnalysis: vi.fn(() => true),
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationAnalysis],
      providers: [{ provide: TransactionStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationAnalysis);
    fixture.componentRef.setInput('simulationId', 'sim2');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading analysis');
  });

  it('should show nothing when analysis is null and not loading', () => {
    const mock = createStoreMock({
      analysis: vi.fn(() => null as unknown as TransactionsAnalysis),
      isLoadingAnalysis: vi.fn(() => false),
    });

    TestBed.configureTestingModule({
      imports: [MhSimulationAnalysis],
      providers: [{ provide: TransactionStore, useValue: mock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MhSimulationAnalysis);
    fixture.componentRef.setInput('simulationId', 'sim3');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Numerical Summary');
  });
});