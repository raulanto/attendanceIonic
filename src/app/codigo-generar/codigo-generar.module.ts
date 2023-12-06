import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoGenerarPageRoutingModule } from './codigo-generar-routing.module';

import { CodigoGenerarPage } from './codigo-generar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoGenerarPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [CodigoGenerarPage]
})
export class CodigoGenerarPageModule {}
