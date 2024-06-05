import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { manufacturersUiRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(manufacturersUiRoutes)],
})
export class ManufacturersUiModule {}
