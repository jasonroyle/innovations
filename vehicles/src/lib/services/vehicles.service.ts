import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';

function mockVehicleId(max = 100): string {
  return `${Math.ceil(Math.random() * max)}`;
}

function mockVehicleColor(): string {
  const colors: string[] = ['Red', 'Green', 'Blue'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function mockVehicleManufacturerId(): string {
  const manufacturerIds = ['1', '2', '3'];
  return manufacturerIds[Math.floor(Math.random() * manufacturerIds.length)];
}

function mockVehicleModel(manufacturerId: string): string {
  const models: { [key: string]: string[]; } = {
    // Volkswagen
    '1': ['Golf', 'Scirocco', 'Arteon'],
    // BMW
    '2': ['430i', 'x6'],
    // Bugatti
    '3': ['Veyron']
  };
  return models[manufacturerId][Math.floor(Math.random() * models[manufacturerId].length)];
}

function mockVehicle(id?: string): Vehicle {
  if (typeof id !== 'string') id = mockVehicleId();
  const manufacturerId = mockVehicleManufacturerId();
  return {
    color: mockVehicleColor(),
    id,
    manufacturerId,
    model: mockVehicleModel(manufacturerId)
  };
}

@Injectable()
export class VehiclesService {
  public loadVehicle(id: string): Vehicle {
    return mockVehicle(id);
  }

  public loadVehicles(): Vehicle[] {
    const vehicles: Vehicle[] = [];
    for (let i = 1; i <= 100; i++) {
      vehicles.push(mockVehicle(`${i}`));
    }
    return vehicles;
  }
}
