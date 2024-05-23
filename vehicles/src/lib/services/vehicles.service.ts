import { Injectable } from '@angular/core';
import { LoadVehicleParams } from '../models/load-vehicles-params';
import { Vehicle } from '../models/vehicle';

function vehiclesMock(): Vehicle[] {
  return [
    {
      id: `${Math.ceil(Math.random() * 10)}`,
      make: 'VolksWagen',
      model: 'Scirocco'
    },
    {
      id: `${Math.ceil(Math.random() * 10)}`,
      make: 'VolksWagen',
      model: 'Golf'
    }
  ];
}

@Injectable()
export class VehiclesService {
  public loadVehicles(params: LoadVehicleParams): Vehicle[] {
    return [...vehiclesMock()];
  }
}
