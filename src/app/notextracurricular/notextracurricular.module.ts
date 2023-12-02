import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotextracurricularPageRoutingModule } from './notextracurricular-routing.module';

import { NotextracurricularPage } from './notextracurricular.page';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotextracurricularPageRoutingModule,
    PaginacionModule
  ],
  declarations: [NotextracurricularPage]
})
export class NotextracurricularPageModule {}
