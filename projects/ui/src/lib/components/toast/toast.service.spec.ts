import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty toasts', () => {
    expect(service.toasts()).toEqual([]);
  });

  describe('show', () => {
    it('should add a toast', () => {
      service.show('Test message');
      expect(service.toasts().length).toBe(1);
      expect(service.toasts()[0].message).toBe('Test message');
    });

    it('should use default type info', () => {
      service.show('Test message');
      expect(service.toasts()[0].type).toBe('info');
    });

    it('should use specified type', () => {
      service.show('Test message', 'success');
      expect(service.toasts()[0].type).toBe('success');
    });

    it('should use default duration of 5000ms', () => {
      vi.useFakeTimers();
      service.show('Test message');
      expect(service.toasts().length).toBe(1);

      vi.advanceTimersByTime(4999);
      expect(service.toasts().length).toBe(1);

      vi.advanceTimersByTime(1);
      expect(service.toasts().length).toBe(0);

      vi.useRealTimers();
    });

    it('should use specified duration', () => {
      vi.useFakeTimers();
      service.show('Test message', 'info', 3000);
      expect(service.toasts().length).toBe(1);

      vi.advanceTimersByTime(3000);
      expect(service.toasts().length).toBe(0);

      vi.useRealTimers();
    });

    it('should not auto-dismiss when duration is 0', () => {
      vi.useFakeTimers();
      service.show('Test message', 'info', 0);
      expect(service.toasts().length).toBe(1);

      vi.advanceTimersByTime(10000);
      expect(service.toasts().length).toBe(1);

      vi.useRealTimers();
    });

    it('should generate unique ids', () => {
      service.show('Message 1');
      service.show('Message 2');
      expect(service.toasts()[0].id).not.toBe(service.toasts()[1].id);
    });
  });

  describe('success', () => {
    it('should add success toast', () => {
      service.success('Success message');
      expect(service.toasts()[0].type).toBe('success');
    });
  });

  describe('error', () => {
    it('should add error toast', () => {
      service.error('Error message');
      expect(service.toasts()[0].type).toBe('error');
    });
  });

  describe('info', () => {
    it('should add info toast', () => {
      service.info('Info message');
      expect(service.toasts()[0].type).toBe('info');
    });
  });

  describe('warning', () => {
    it('should add warning toast', () => {
      service.warning('Warning message');
      expect(service.toasts()[0].type).toBe('warning');
    });
  });

  describe('dismiss', () => {
    it('should remove toast by id', () => {
      service.show('Message 1');
      service.show('Message 2');
      const id = service.toasts()[0].id;
      service.dismiss(id);
      expect(service.toasts().length).toBe(1);
      expect(service.toasts()[0].message).toBe('Message 2');
    });

    it('should not error when dismissing non-existent toast', () => {
      service.dismiss('non-existent-id');
      expect(service.toasts().length).toBe(0);
    });
  });

  describe('clear', () => {
    it('should remove all toasts', () => {
      service.show('Message 1');
      service.show('Message 2');
      service.show('Message 3');
      service.clear();
      expect(service.toasts().length).toBe(0);
    });
  });
});