import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomAlumnPageRoutingModule } from './classroom-alumn-routing.module';

import { ClassroomAlumnPage } from './classroom-alumn.page';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomAlumnPageRoutingModule,
    PaginacionModule
  ],
  declarations: [ClassroomAlumnPage]
})
export class ClassroomAlumnPageModule {}
