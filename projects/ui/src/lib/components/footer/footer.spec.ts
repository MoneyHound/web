import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MHFooter } from './footer';

describe('MHFooter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [MHFooter],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MHFooter);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render logo and copyright', () => {
    const fixture = TestBed.createComponent(MHFooter);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-logo')).toBeTruthy();
    expect(compiled.querySelector('.footer__copy')?.textContent).toContain('2026');
  });

  it('should render footer links', () => {
    const fixture = TestBed.createComponent(MHFooter);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.footer__links a');
    expect(links.length).toBe(4);
  });
});