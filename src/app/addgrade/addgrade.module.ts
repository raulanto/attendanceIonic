import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddgradePageRoutingModule } from './addgrade-routing.module';

import { AddgradePage } from './addgrade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddgradePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddgradePage]
})
export class AddgradePageModule {}
