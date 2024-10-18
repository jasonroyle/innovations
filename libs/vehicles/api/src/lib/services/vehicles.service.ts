import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';

const vehicles: {
  [manufacturerId: string]: { [model: string]: { price?: [number, number] } };
} = {
  // Volkswagen
  '1': {
    Arteon: { price: [30000, 55000] },
    Golf: { price: [14000, 35000] },
    Polo: { price: [8000, 22000] },
    Scirocco: { price: [12000, 30000] },
  },
  // BMW
  '2': {
    '1 Series': {},
    '2 Series Active Tourer': {},
    '2 Series Coupé': {},
    '2 Series Gran Coupé': {},
    '3 Series Saloon': {},
    '3 Series Touring': {},
    '3 Series Saloon M': {},
    '3 Series Touring M': {},
    '4 Series Coupé': {},
    '4 Series Convertable': {},
    '4 Series Gran Coupé': {},
    'i4 Gran Coupé': {},
    'i4 M50 Gran Coupé': {},
    i5: {},
    'i5 M60 xDrive': {},
    'i5 M60 xDrive Touring': {},
    'i5 Touring': {},
    i7: {},
    'i7 M70 xDrive': {},
    iX: {},
    iX1: {},
    iX2: {},
    iX3: {},
    'iX M60': {},
    'M135 xDrive': {},
    'M440i xDrive Gran Coupé': {},
    M8: {},
    x6: {},
  },
  // Bugatti
  '3': {
    Chiron: { price: [3000000, 3400000] },
    Tourbillon: { price: [4000000, 4600000] },
    Veyron: { price: [1000000, 2700000] },
  },
  // Volvo
  '4': {
    EC40: {},
    EX30: {},
    EX40: {},
    EX90: {},
    XC40: {},
    XC60: {},
    XC90: {},
  },
  // Ford
  '5': {
    Explorer: {},
    Fiesta: { price: [8000, 20000] },
    Focus: { price: [14000, 35000] },
    Kuga: {},
    Mustang: { price: [40000, 55000] },
    'Mustang Mach-E': {},
    Puma: {},
  },
};

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
  const models = Object.keys(vehicles[manufacturerId]);
  return models[Math.floor(Math.random() * models.length)];
}

function mockVehiclePrice(manufacturerId: string, model: string): number {
  const price = vehicles[manufacturerId]?.[model]?.price ?? [10000, 50000];
  return (
    Math.floor((Math.random() * (price[1] - price[0] + 1) + price[0]) * 100) /
    100
  );
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
  const model = mockVehicleModel(manufacturerId);
  return {
    color: mockVehicleColor(),
    manufacturerId,
    model,
    price: mockVehiclePrice(manufacturerId, model),
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
