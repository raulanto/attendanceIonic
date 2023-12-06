import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoGeneradoPageRoutingModule } from './codigo-generado-routing.module';

import { CodigoGeneradoPage } from './codigo-generado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoGeneradoPageRoutingModule
  ],
  declarations: [CodigoGeneradoPage]
})
export class CodigoGeneradoPageModule {}
