import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleRegistrationMark',
})
export class VehicleRegistrationMarkPipe implements PipeTransform {
  transform(value: unknown): string | null {
    if (typeof value !== 'string') return null;
    if (value.length !== 7 || /[^a-z0-9]/i.test(value)) return value;
    return [value.slice(0, 4), value.slice(4)].join(' ');
  }
}
