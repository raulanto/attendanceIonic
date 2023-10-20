import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewextracurricularPageRoutingModule } from './newextracurricular-routing.module';

import { NewextracurricularPage } from './newextracurricular.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewextracurricularPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewextracurricularPage]
})
export class NewextracurricularPageModule {}
