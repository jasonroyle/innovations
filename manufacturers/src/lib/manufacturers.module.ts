import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { manufacturersRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(manufacturersRoutes)],
})
export class ManufacturersModule {}
