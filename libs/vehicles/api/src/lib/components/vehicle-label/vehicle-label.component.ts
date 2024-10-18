import { Component, Input } from '@angular/core';

import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'innov-vehicle-label',
  templateUrl: './vehicle-label.component.html',
  styleUrl: './vehicle-label.component.scss',
})
export class VehicleLabelComponent {
  @Input() public isActive = false;
  @Input() public manufacturer?: string;
  @Input() public paletteTone = 500;
  @Input() public vehicle?: Vehicle;
}
