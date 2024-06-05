import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDetailComponent } from './components/master-detail/master-detail.component';

const exports = [MasterDetailComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...exports],
  exports,
})
export class SharedModule {}
