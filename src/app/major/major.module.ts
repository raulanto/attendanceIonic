import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MajorPageRoutingModule } from './major-routing.module';

import { MajorPage } from './major.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MajorPageRoutingModule
  ],
  declarations: [MajorPage]
})
export class MajorPageModule {}
