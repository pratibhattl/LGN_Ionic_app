import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcomplainPageRoutingModule } from './addcomplain-routing.module';

import { AddcomplainPage } from './addcomplain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcomplainPageRoutingModule
  ],
  declarations: [AddcomplainPage]
})
export class AddcomplainPageModule {}
