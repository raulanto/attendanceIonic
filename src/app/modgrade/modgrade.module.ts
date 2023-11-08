import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModgradePageRoutingModule } from './modgrade-routing.module';

import { ModgradePage } from './modgrade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModgradePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModgradePage]
})
export class ModgradePageModule {}
