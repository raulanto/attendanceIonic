import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnoFormPageRoutingModule } from './alumno-form-routing.module';

import { AlumnoFormPage } from './alumno-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoFormPageRoutingModule
  ],
  declarations: [AlumnoFormPage]
})
export class AlumnoFormPageModule {}
