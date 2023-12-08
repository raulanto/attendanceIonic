import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElimMajorPageRoutingModule } from './elim-major-routing.module';

import { ElimMajorPage } from './elim-major.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElimMajorPageRoutingModule
  ],
  declarations: [ElimMajorPage]
})
export class ElimMajorPageModule {}
