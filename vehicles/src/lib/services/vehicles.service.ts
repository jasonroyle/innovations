import { Injectable } from '@angular/core';
import { LoadVehicleParams } from '../models/load-vehicles-params';
import { Vehicle } from '../models/vehicle';

const vehiclesMock: Vehicle[] = [
  {
    id: 'a',
    make: 'VolksWagen',
    model: 'Scirocco'
  },
  {
    id: 'b',
    make: 'VolksWagen',
    model: 'Golf'
  }
];

@Injectable()
export class VehiclesService {
  public loadVehicles(params: LoadVehicleParams): Vehicle[] {
    return [...vehiclesMock];
  }
}
