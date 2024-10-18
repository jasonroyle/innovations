import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ColorIndicatorComponent } from './components/color-indicator/color-indicator.component';
import { MasterDetailComponent } from './components/master-detail/master-detail.component';
import { SearchComponent } from './components/search/search.component';
import { SiPrefixPipe } from './pipes/si-prefix.pipe';

const exports = [
  ColorIndicatorComponent,
  MasterDetailComponent,
  SearchComponent,
  SiPrefixPipe,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [...exports],
  exports,
})
export class SharedModule {}
