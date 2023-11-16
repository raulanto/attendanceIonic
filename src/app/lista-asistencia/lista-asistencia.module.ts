import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { IonicModule } from '@ionic/angular';

import { ListaAsistenciaPageRoutingModule } from './lista-asistencia-routing.module';

import { ListaAsistenciaPage } from './lista-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAsistenciaPageRoutingModule,
    PaginacionModule,
  ],
  declarations: [ListaAsistenciaPage]
})
export class ListaAsistenciaPageModule {}
