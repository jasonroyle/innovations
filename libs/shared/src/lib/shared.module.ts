import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MasterDetailComponent } from './components/master-detail/master-detail.component';

const exports = [MasterDetailComponent];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...exports],
  exports,
})
export class SharedModule {}
