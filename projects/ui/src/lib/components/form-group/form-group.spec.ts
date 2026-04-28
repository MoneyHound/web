import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { describe, it, expect, beforeEach } from 'vitest';
import { MhFormGroup } from './form-group';

describe('MhFormGroup', () => {
  let component: MhFormGroup;
  let fixture: ComponentFixture<MhFormGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MhFormGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(MhFormGroup);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('for', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Test Label');
  });

  it('should not show error when control is untouched', () => {
    const control = new FormControl('', Validators.required);
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();

    expect(component.showError).toBe(false);
    expect(fixture.nativeElement.querySelector('.field-error')).toBeNull();
  });

  it('should not show error when control is valid', () => {
    const control = new FormControl('valid', Validators.required);
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();

    expect(component.showError).toBe(false);
  });

  it('should show error when control is touched and invalid', () => {
    const control = new FormControl('', Validators.required);
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();

    expect(component.showError).toBe(true);
    expect(fixture.nativeElement.querySelector('.field-error')).toBeTruthy();
  });

  it('should display default required error message', () => {
    const control = new FormControl('', Validators.required);
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();

    expect(component.errorMessage).toBe('This field is required');
  });

  it('should display custom required error message', () => {
    const control = new FormControl('', Validators.required);
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('errors', { required: 'Custom required message' });
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Custom required message');
  });

  it('should display default email error message', () => {
    const control = new FormControl('invalid', [Validators.required, Validators.email]);
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Please enter a valid email');
  });

  it('should display custom email error message', () => {
    const control = new FormControl('invalid', [Validators.required, Validators.email]);
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('errors', { email: 'Custom email message' });
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Custom email message');
  });

  it('should display minlength error with required length', () => {
    const control = new FormControl('ab', Validators.minLength(3));
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Minimum 3 characters required');
  });

  it('should display custom minlength error message', () => {
    const control = new FormControl('ab', Validators.minLength(3));
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('errors', { minlength: 'Custom minlength message' });
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Custom minlength message');
  });
});