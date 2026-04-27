import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Footer);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render logo and copyright', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mh-logo')).toBeTruthy();
    expect(compiled.querySelector('.footer__copy')?.textContent).toContain('2026');
  });

  it('should render footer links', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.footer__links a');
    expect(links.length).toBe(3);
  });
});