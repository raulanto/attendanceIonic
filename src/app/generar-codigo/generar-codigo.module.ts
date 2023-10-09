import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarCodigoPageRoutingModule } from './generar-codigo-routing.module';

import { GenerarCodigoPage } from './generar-codigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarCodigoPageRoutingModule
  ],
  declarations: [GenerarCodigoPage]
})
export class GenerarCodigoPageModule {}
