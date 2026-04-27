import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Hero);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render headline', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero__headline')?.textContent).toContain('Synthetic Data');
  });

  it('should render CTA', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('.hero__cta') as HTMLAnchorElement;
    expect(cta?.textContent).toContain('Get Started');
  });
});