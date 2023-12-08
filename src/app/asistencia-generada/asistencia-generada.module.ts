import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaGeneradaPageRoutingModule } from './asistencia-generada-routing.module';

import { AsistenciaGeneradaPage } from './asistencia-generada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AsistenciaGeneradaPageRoutingModule
  ],
  declarations: [AsistenciaGeneradaPage]
})
export class AsistenciaGeneradaPageModule {}
