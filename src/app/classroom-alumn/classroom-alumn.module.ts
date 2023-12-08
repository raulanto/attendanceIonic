import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomAlumnPageRoutingModule } from './classroom-alumn-routing.module';

import { ClassroomAlumnPage } from './classroom-alumn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomAlumnPageRoutingModule
  ],
  declarations: [ClassroomAlumnPage]
})
export class ClassroomAlumnPageModule {}
