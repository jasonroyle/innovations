import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MasterDetailComponent } from './components/master-detail/master-detail.component';
import { SearchComponent } from './components/search/search.component';

const exports = [MasterDetailComponent, SearchComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [...exports],
  exports,
})
export class SharedModule {}
