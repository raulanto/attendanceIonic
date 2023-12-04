import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModsubjectPageRoutingModule } from './modsubject-routing.module';

import { ModsubjectPage } from './modsubject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModsubjectPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModsubjectPage]
})
export class ModsubjectPageModule {}
