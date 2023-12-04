import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModmajorPageRoutingModule } from './modmajor-routing.module';

import { ModmajorPage } from './modmajor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModmajorPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModmajorPage]
})
export class ModmajorPageModule {}
