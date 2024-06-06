import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManufacturersApiModule } from '@codeweavers/manufacturers-api';

import { manufacturersUiRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(manufacturersUiRoutes),
    ManufacturersApiModule,
  ],
})
export class ManufacturersUiModule {}
