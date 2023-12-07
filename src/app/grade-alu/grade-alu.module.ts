import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradeAluPageRoutingModule } from './grade-alu-routing.module';

import { GradeAluPage } from './grade-alu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradeAluPageRoutingModule
  ],
  declarations: [GradeAluPage]
})
export class GradeAluPageModule {}
