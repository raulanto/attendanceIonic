import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpMajorPageRoutingModule } from './up-major-routing.module';

import { UpMajorPage } from './up-major.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpMajorPageRoutingModule
  ],
  declarations: [UpMajorPage]
})
export class UpMajorPageModule {}
