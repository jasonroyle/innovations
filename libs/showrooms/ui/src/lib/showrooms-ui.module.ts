import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { showroomsUiRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(showroomsUiRoutes)],
})
export class ShowroomsUiModule {}
