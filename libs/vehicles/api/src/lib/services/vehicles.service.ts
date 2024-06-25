import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';

function mockVehicleColor(): string {
  const colors: string[] = [
    'Black',
    'Blue',
    'Grey',
    'Green',
    'Purple',
    'Red',
    'Silver',
    'White',
    'Yellow',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function mockVehicleManufacturerId(): string {
  const manufacturerIds = ['1', '2', '3', '4', '5'];
  return manufacturerIds[Math.floor(Math.random() * manufacturerIds.length)];
}

function mockVehicleModel(manufacturerId: string): string {
  const models: { [key: string]: string[] } = {
    // Volkswagen
    '1': ['Arteon', 'Golf', 'Polo', 'Scirocco'],
    // BMW
    '2': [
      '1 Series',
      '2 Series Active Tourer',
      '2 Series Coupé',
      '2 Series Gran Coupé',
      '3 Series Saloon',
      '3 Series Touring',
      '3 Series Saloon M',
      '3 Series Touring M',
      '4 Series Coupé',
      '4 Series Convertable',
      '4 Series Gran Coupé',
      'i4 Gran Coupé',
      'i4 M50 Gran Coupé',
      'i5',
      'i5 M60 xDrive',
      'i5 M60 xDrive Touring',
      'i5 Touring',
      'i7',
      'i7 M70 xDrive',
      'iX',
      'iX1',
      'iX2',
      'iX3',
      'iX M60',
      'M135 xDrive',
      'M440i xDrive Gran Coupé',
      'M8',
      'x6',
    ],
    // Bugatti
    '3': ['Chiron', 'Tourbillon', 'Veyron'],
    // Volvo
    '4': ['EC40', 'EX30', 'EX40', 'EX90', 'XC40', 'XC60', 'XC90'],
    // Ford
    '5': [
      'Explorer',
      'Fiesta',
      'Focus',
      'Kuga',
      'Mustang',
      'Mustang Mach-E',
      'Puma',
    ],
  };
  return models[manufacturerId][
    Math.floor(Math.random() * models[manufacturerId].length)
  ];
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
    registrationNumber,
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
