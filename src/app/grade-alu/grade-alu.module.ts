import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradeAluPageRoutingModule } from './grade-alu-routing.module';

import { GradeAluPage } from './grade-alu.page';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradeAluPageRoutingModule,
    PaginacionModule
  ],
  declarations: [GradeAluPage]
})
export class GradeAluPageModule {}
