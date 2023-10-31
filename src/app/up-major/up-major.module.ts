import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpMajorPageRoutingModule } from './up-major-routing.module';

import { UpMajorPage } from './up-major.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpMajorPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UpMajorPage]
})
export class UpMajorPageModule {}
