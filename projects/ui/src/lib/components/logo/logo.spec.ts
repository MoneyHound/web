import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MhLogo } from './logo';

describe('MhLogo', () => {
  let component: MhLogo;
  let fixture: ComponentFixture<MhLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MhLogo],
    }).compileComponents();

    fixture = TestBed.createComponent(MhLogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the mark image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('.logo__mark') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.alt).toContain('MoneyHound');
  });

  it('should render wordmark by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo__wordmark')?.textContent).toContain('MoneyHound');
  });

  it('should hide wordmark when input is false', () => {
    fixture.componentRef.setInput('wordmark', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo__wordmark')).toBeNull();
  });
});