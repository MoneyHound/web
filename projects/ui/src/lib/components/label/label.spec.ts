import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MhLabel } from './label';

@Component({
  imports: [MhLabel],
  template: '<label mh-label for="name">Name</label>',
})
class LabelHost {}

describe('MhLabel', () => {
  it('should render label with for attribute', () => {
    const fixture = TestBed.createComponent(LabelHost);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('[mh-label]') as HTMLLabelElement;
    expect(label).toBeTruthy();
    expect(label.htmlFor).toBe('name');
    expect(label.textContent).toContain('Name');
  });

  it('should apply mh-label class', () => {
    const fixture = TestBed.createComponent(LabelHost);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('[mh-label]') as HTMLElement;
    expect(label.classList).toContain('mh-label');
  });
});