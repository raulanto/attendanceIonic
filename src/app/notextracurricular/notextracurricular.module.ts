import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotextracurricularPageRoutingModule } from './notextracurricular-routing.module';

import { NotextracurricularPage } from './notextracurricular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotextracurricularPageRoutingModule
  ],
  declarations: [NotextracurricularPage]
})
export class NotextracurricularPageModule {}
