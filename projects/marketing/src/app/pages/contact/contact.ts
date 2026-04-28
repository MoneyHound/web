import { Component } from '@angular/core';
import { MhButton, MhInput, MhLabel, MhTextarea } from 'ui';

@Component({
  selector: 'mh-contact',
  imports: [MhButton, MhInput, MhLabel, MhTextarea],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {}