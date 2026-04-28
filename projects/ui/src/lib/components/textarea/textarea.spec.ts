import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MhTextarea } from './textarea';

@Component({
  imports: [MhTextarea],
  template: '<textarea mh-textarea id="msg" [rows]="5" placeholder="Message"></textarea>',
})
class TextareaHost {}

describe('MhTextarea', () => {
  it('should render textarea with attributes', () => {
    const fixture = TestBed.createComponent(TextareaHost);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('[mh-textarea]') as HTMLTextAreaElement;
    expect(textarea).toBeTruthy();
    expect(textarea.id).toBe('msg');
    expect(textarea.rows).toBe(5);
    expect(textarea.placeholder).toBe('Message');
  });

  it('should apply mh-textarea class', () => {
    const fixture = TestBed.createComponent(TextareaHost);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('[mh-textarea]') as HTMLElement;
    expect(textarea.classList).toContain('mh-textarea');
  });
});