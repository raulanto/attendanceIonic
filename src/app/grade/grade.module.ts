import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradePageRoutingModule } from './grade-routing.module';

import { GradePage } from './grade.page';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradePageRoutingModule,
    PaginacionModule
  ],
  declarations: [GradePage]
})
export class GradePageModule {}
