import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaAluPageRoutingModule } from './asistencia-alu-routing.module';

import { AsistenciaAluPage } from './asistencia-alu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaAluPageRoutingModule
  ],
  declarations: [AsistenciaAluPage]
})
export class AsistenciaAluPageModule {}
