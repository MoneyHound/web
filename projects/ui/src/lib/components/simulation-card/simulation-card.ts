import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Simulation, SimulationStatus } from 'models';

@Component({
  selector: 'mh-simulation-card',
  imports: [DatePipe, RouterLink, NgTemplateOutlet],
  templateUrl: './simulation-card.html',
  styleUrl: './simulation-card.scss',
})
export class MhSimulationCard {
  readonly simulation = input.required<Simulation>();
  readonly link = input<string>();

  getStatusClass(status: SimulationStatus): string {
    switch (status) {
      case SimulationStatus.Complete:
        return 'mh-simulation-card__status--complete';
      case SimulationStatus.Pending:
        return 'mh-simulation-card__status--pending';
      case SimulationStatus.Failed:
        return 'mh-simulation-card__status--failed';
      default:
        return '';
    }
  }

  getStatusLabel(status: SimulationStatus): string {
    switch (status) {
      case SimulationStatus.Complete:
        return 'Complete';
      case SimulationStatus.Pending:
        return 'Pending';
      case SimulationStatus.Failed:
        return 'Failed';
      default:
        return status;
    }
  }
}