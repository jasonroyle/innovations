import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { showroomRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(showroomRoutes)],
})
export class ShowroomModule {}
