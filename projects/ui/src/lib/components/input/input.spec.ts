import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MhInput } from './input';
import { MhLabel } from '../label/label';

@Component({
  imports: [MhInput, MhLabel],
  template: `
    <label mh-label for="name">Name</label>
    <input mh-input id="name" placeholder="Your name" />
  `,
})
class InputHost {}

describe('MhInput', () => {
  it('should render input with attributes', () => {
    const fixture = TestBed.createComponent(InputHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('[mh-input]') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.id).toBe('name');
    expect(input.placeholder).toBe('Your name');
  });

  it('should apply mh-input class', () => {
    const fixture = TestBed.createComponent(InputHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('[mh-input]') as HTMLElement;
    expect(input.classList).toContain('mh-input');
  });
});