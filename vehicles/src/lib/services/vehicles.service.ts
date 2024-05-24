import { Injectable } from '@angular/core';
import { LoadVehicleParams } from '../models/load-vehicles-params';
import { Vehicle } from '../models/vehicle';

function mockVehicleId(max = 10): string {
  return `${Math.ceil(Math.random() * max)}`;
}

function mockVehicles(): Vehicle[] {
  return [
    {
      id: mockVehicleId(),
      manufacturerId: '1',
      model: 'Scirocco'
    },
    {
      id: mockVehicleId(),
      manufacturerId: '1',
      model: 'Golf'
    },
    {
      id: mockVehicleId(),
      manufacturerId: '2',
      model: '430i'
    },
    {
      id: mockVehicleId(),
      manufacturerId: '3',
      model: 'Veyron'
    }
  ];
}

@Injectable()
export class VehiclesService {
  public loadVehicles(params: LoadVehicleParams): Vehicle[] {
    return [...mockVehicles()];
  }
}
