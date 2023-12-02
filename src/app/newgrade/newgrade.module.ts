import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewgradePageRoutingModule } from './newgrade-routing.module';

import { NewgradePage } from './newgrade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewgradePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewgradePage]
})
export class NewgradePageModule {}

