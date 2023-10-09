import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCodigosPageRoutingModule } from './lista-codigos-routing.module';

import { ListaCodigosPage } from './lista-codigos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCodigosPageRoutingModule
  ],
  declarations: [ListaCodigosPage]
})
export class ListaCodigosPageModule {}
