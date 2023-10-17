import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoOpcPageRoutingModule } from './grupo-opc-routing.module';

import { GrupoOpcPage } from './grupo-opc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoOpcPageRoutingModule
  ],
  declarations: [GrupoOpcPage]
})
export class GrupoOpcPageModule {}
