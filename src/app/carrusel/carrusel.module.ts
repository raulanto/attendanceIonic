import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarruselPageRoutingModule } from './carrusel-routing.module';

import { CarruselPage } from './carrusel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarruselPageRoutingModule
  ],

})
export class CarruselPageModule {}
