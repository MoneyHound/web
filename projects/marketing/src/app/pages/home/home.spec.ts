import { TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Home);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all sections', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-hero')).toBeTruthy();
    expect(compiled.querySelector('mh-features')).toBeTruthy();
    expect(compiled.querySelector('mh-how-it-works')).toBeTruthy();
    expect(compiled.querySelector('mh-cta-banner')).toBeTruthy();
  });
});