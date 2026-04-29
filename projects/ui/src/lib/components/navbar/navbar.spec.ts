import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MHNavbar } from './navbar';

describe('MHNavbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [MHNavbar],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MHNavbar);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render logo', () => {
    const fixture = TestBed.createComponent(MHNavbar);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-logo')).toBeTruthy();
  });

  it('should render CTA link', () => {
    const fixture = TestBed.createComponent(MHNavbar);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('[mh-button]') as HTMLAnchorElement;
    expect(cta?.textContent).toContain('Get Started');
  });

  it('should render nav links', () => {
    const fixture = TestBed.createComponent(MHNavbar);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.navbar__link');
    expect(links.length).toBe(2);
  });
});