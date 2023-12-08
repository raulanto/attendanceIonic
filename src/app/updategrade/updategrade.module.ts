import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdategradePageRoutingModule } from './updategrade-routing.module';

import { UpdategradePage } from './updategrade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdategradePageRoutingModule
  ],
  declarations: [UpdategradePage]
})
export class UpdategradePageModule {}