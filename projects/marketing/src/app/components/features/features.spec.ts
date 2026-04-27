import { TestBed } from '@angular/core/testing';
import { Features } from './features';

describe('Features', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Features],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Features);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render three feature cards', () => {
    const fixture = TestBed.createComponent(Features);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.features__card');
    expect(cards.length).toBe(3);
  });

  it('should render feature titles', () => {
    const fixture = TestBed.createComponent(Features);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Simulation Datasets');
    expect(compiled.textContent).toContain('Anomaly Signals');
    expect(compiled.textContent).toContain('Regulatory Compliance');
  });
});