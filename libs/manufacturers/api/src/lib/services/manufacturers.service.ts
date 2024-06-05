import { Injectable } from '@angular/core';

import { Manufacturer } from '../models/manufacturer';

function mockManufacturers(): Manufacturer[] {
  return [
    {
      id: '1',
      name: 'Volkswagen',
    },
    {
      id: '2',
      name: 'BMW',
    },
    {
      id: '3',
      name: 'Bugatti',
    },
    {
      id: '4',
      name: 'Volvo',
    },
    {
      id: '5',
      name: 'Ford',
    },
  ];
}

Injectable();
export class ManufacturersService {
  loadManufacturers(): Manufacturer[] {
    return mockManufacturers();
  }
}
