import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { vehiclesUiRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(vehiclesUiRoutes)],
})
export class VehiclesUiModule {}
