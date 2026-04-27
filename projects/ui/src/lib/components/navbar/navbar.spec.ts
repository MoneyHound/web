import { TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';

describe('Navbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Navbar);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render logo', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-logo')).toBeTruthy();
  });

  it('should render CTA link', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('.navbar__cta') as HTMLAnchorElement;
    expect(cta?.textContent).toContain('Get Started');
    expect(cta?.href).toContain('/dashboard');
  });
});