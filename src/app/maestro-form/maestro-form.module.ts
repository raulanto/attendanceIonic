import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroFormPageRoutingModule } from './maestro-form-routing.module';

import { MaestroFormPage } from './maestro-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroFormPageRoutingModule
  ],
  declarations: [MaestroFormPage]
})
export class MaestroFormPageModule {}
