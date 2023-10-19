import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtracurricularPageRoutingModule } from './extracurricular-routing.module';

import { ExtracurricularPage } from './extracurricular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtracurricularPageRoutingModule
  ],
  declarations: [ExtracurricularPage]
})
export class ExtracurricularPageModule {}
