import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionMaPageRoutingModule } from './seleccion-ma-routing.module';

import { SeleccionMaPage } from './seleccion-ma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionMaPageRoutingModule
  ],
  declarations: [SeleccionMaPage]
})
export class SeleccionMaPageModule {}
