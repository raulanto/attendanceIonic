import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarAsistenciaPageRoutingModule } from './tomar-asistencia-routing.module';

import { TomarAsistenciaPage } from './tomar-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomarAsistenciaPageRoutingModule
  ],
  declarations: [TomarAsistenciaPage]
})
export class TomarAsistenciaPageModule {}
