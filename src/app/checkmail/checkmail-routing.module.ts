import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckmailPage } from './checkmail.page';

const routes: Routes = [
  {
    path: '',
    component: CheckmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckmailPageRoutingModule {}
