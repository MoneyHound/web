import { Component, inject, input, Optional, output, SkipSelf } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { MhButton, MhFormGroup, MhInput } from 'ui';

@Component({
  selector: 'mh-otp-input',
  imports: [ReactiveFormsModule, MhButton, MhFormGroup, MhInput],
  templateUrl: './otp-input.html',
  styleUrl: './otp-input.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer | null) => container,
      deps: [[new Optional(), new SkipSelf(), ControlContainer]],
    },
  ],
})
export class MhOtpInput {
  readonly codeSent = input<boolean>(false);
  readonly resendWait = input<number>(0);
  readonly loading = input<boolean>(false);
  readonly control = input<any>(null);
  readonly sendCode = output();
}