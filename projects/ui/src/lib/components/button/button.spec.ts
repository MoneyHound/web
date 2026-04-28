import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MhButton } from './button';

@Component({
  imports: [MhButton],
  template: '<a mh-button>Click</a>',
})
class ButtonHost {}

@Component({
  imports: [MhButton],
  template: '<a mh-button variant="secondary" size="lg">Click</a>',
})
class ButtonVariantHost {}

describe('MhButton', () => {
  it('should create as attribute on anchor', () => {
    const fixture = TestBed.createComponent(ButtonHost);
    const button = fixture.debugElement.query((el) => el.componentInstance instanceof MhButton);
    expect(button.componentInstance).toBeTruthy();
  });

  it('should apply primary variant by default', () => {
    const fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('[mh-button]') as HTMLElement;
    expect(host.classList).toContain('mh-button--primary');
    expect(host.classList).toContain('mh-button--default');
  });

  it('should apply variant and size inputs', () => {
    const fixture = TestBed.createComponent(ButtonVariantHost);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('[mh-button]') as HTMLElement;
    expect(host.classList).toContain('mh-button--secondary');
    expect(host.classList).toContain('mh-button--lg');
  });

  it('should project content', () => {
    const fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('[mh-button]') as HTMLElement;
    expect(host.textContent).toContain('Click');
  });
});