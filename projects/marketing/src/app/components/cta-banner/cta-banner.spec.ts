import { TestBed } from '@angular/core/testing';
import { CtaBanner } from './cta-banner';

describe('CtaBanner', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaBanner],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CtaBanner);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render headline and CTA', () => {
    const fixture = TestBed.createComponent(CtaBanner);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cta-banner__headline')?.textContent).toContain(
      'Ready to test your compliance systems?',
    );
    expect(compiled.querySelector('[mh-button]')?.textContent).toContain('Get Started');
  });
});