import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcomplainPage } from './addcomplain.page';

const routes: Routes = [
  {
    path: '',
    component: AddcomplainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcomplainPageRoutingModule {}
