import { TestBed } from '@angular/core/testing';
import { HowItWorks } from './how-it-works';

describe('HowItWorks', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorks],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HowItWorks);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render three steps', () => {
    const fixture = TestBed.createComponent(HowItWorks);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const steps = compiled.querySelectorAll('.how-it-works__step');
    expect(steps.length).toBe(3);
  });

  it('should render step titles', () => {
    const fixture = TestBed.createComponent(HowItWorks);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Sign up in seconds');
    expect(compiled.textContent).toContain('Configure parameters');
    expect(compiled.textContent).toContain('Generate & validate');
  });
});