import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';

function mockVehicleColor(): string {
  const colors: string[] = ['Red', 'Green', 'Blue'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function mockVehicleManufacturerId(): string {
  const manufacturerIds = ['1', '2', '3', '4', '5'];
  return manufacturerIds[Math.floor(Math.random() * manufacturerIds.length)];
}

function mockVehicleModel(manufacturerId: string): string {
  const models: { [key: string]: string[]; } = {
    // Volkswagen
    '1': ['Golf', 'Scirocco', 'Arteon'],
    // BMW
    '2': ['430i', 'x6'],
    // Bugatti
    '3': ['Veyron'],
    // Volvo
    '4': ['S40'],
    // Ford
    '5': ['Fiesta', 'Focus']
  };
  return models[manufacturerId][Math.floor(Math.random() * models[manufacturerId].length)];
}

function mockVehicleRegistrationNumber(): string {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeric = '0123456789';
  let chars = alpha;
  let reg = '';
  for (let i = 0; i < 7; i++) {
    chars = i > 1 && i < 4 ? numeric : alpha;
    reg += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return reg;
}

function mockVehicle(registrationNumber?: string): Vehicle {
  if (!registrationNumber) registrationNumber = mockVehicleRegistrationNumber();
  const manufacturerId = mockVehicleManufacturerId();
  return {
    color: mockVehicleColor(),
    manufacturerId,
    model: mockVehicleModel(manufacturerId),
    registrationNumber
  };
}

@Injectable()
export class VehiclesService {
  public loadVehicle(registrationNumber: string): Vehicle {
    return mockVehicle(registrationNumber);
  }

  public loadVehicles(): Vehicle[] {
    const vehicles: Vehicle[] = [];
    for (let i = 1; i <= 100; i++) {
      vehicles.push(mockVehicle());
    }
    return vehicles;
  }
}
