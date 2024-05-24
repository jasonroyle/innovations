import { Injectable } from '@angular/core';
import { LoadManufacturersParams } from '../models/load-manufacturers-params';
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
  loadManufacturers(params: LoadManufacturersParams): Manufacturer[] {
    return mockManufacturers();
  }
}
