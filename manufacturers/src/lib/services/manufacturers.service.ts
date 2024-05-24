import { Injectable } from '@angular/core';
import { Manufacturer } from '../models/manufacturer';

function mockManufacturers(): Manufacturer[] {
  return [
    {
      id: '1',
      name: 'VolksWagen'
    },
    {
      id: '2',
      name: 'BMW'
    },
    {
      id: '3',
      name: 'Bugatti'
    }
  ];
}

Injectable()
export class ManufacturersService {
  loadManufacturers(): Manufacturer[] {
    return mockManufacturers();
  }
}
