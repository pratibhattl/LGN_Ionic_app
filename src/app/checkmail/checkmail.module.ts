import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckmailPageRoutingModule } from './checkmail-routing.module';

import { CheckmailPage } from './checkmail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckmailPageRoutingModule
  ],
  declarations: [CheckmailPage]
})
export class CheckmailPageModule {}
