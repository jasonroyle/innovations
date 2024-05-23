import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { vehiclesRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(vehiclesRoutes)],
})
export class VehiclesModule {}
