import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraAluPageRoutingModule } from './extra-alu-routing.module';

import { ExtraAluPage } from './extra-alu.page';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtraAluPageRoutingModule,
    PaginacionModule
  ],
  declarations: [ExtraAluPage]
})
export class ExtraAluPageModule {}
