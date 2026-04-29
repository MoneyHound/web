import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { MhToastContainer } from './toast-container';
import { ToastService } from './toast.service';

describe('MhToastContainer', () => {
  let component: MhToastContainer;
  let fixture: ComponentFixture<MhToastContainer>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MhToastContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(MhToastContainer);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no toasts initially', () => {
    const container = fixture.nativeElement.querySelector('.toast-container');
    expect(container.children.length).toBe(0);
  });

  it('should display toast when added', () => {
    toastService.show('Test message');
    fixture.detectChanges();

    const toast = fixture.nativeElement.querySelector('.toast');
    expect(toast).toBeTruthy();
    expect(toast.textContent).toContain('Test message');
  });

  it('should display correct type class', () => {
    toastService.error('Error message');
    fixture.detectChanges();

    const toast = fixture.nativeElement.querySelector('.toast');
    expect(toast.classList.contains('toast--error')).toBe(true);
  });

  it('should display multiple toasts', () => {
    toastService.show('Message 1');
    toastService.show('Message 2');
    fixture.detectChanges();

    const toasts = fixture.nativeElement.querySelectorAll('.toast');
    expect(toasts.length).toBe(2);
  });

  it('should dismiss toast when close button clicked', () => {
    toastService.show('Test message');
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.toast__close');
    closeButton.click();
    fixture.detectChanges();

    const toast = fixture.nativeElement.querySelector('.toast');
    expect(toast).toBeFalsy();
  });

  describe('getIcon', () => {
    it('should return checkmark for success', () => {
      expect(component.getIcon('success')).toBe('✓');
    });

    it('should return x for error', () => {
      expect(component.getIcon('error')).toBe('✕');
    });

    it('should return warning for warning', () => {
      expect(component.getIcon('warning')).toBe('⚠');
    });

    it('should return info for info', () => {
      expect(component.getIcon('info')).toBe('ℹ');
    });
  });
});