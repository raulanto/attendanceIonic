import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodiogogPageRoutingModule } from './codiogog-routing.module';

import { CodiogogPage } from './codiogog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodiogogPageRoutingModule
  ],
  declarations: [CodiogogPage]
})
export class CodiogogPageModule {}
