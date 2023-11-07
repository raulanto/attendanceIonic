import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElimSubjectPageRoutingModule } from './elim-subject-routing.module';

import { ElimSubjectPage } from './elim-subject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElimSubjectPageRoutingModule
  ],
  declarations: [ElimSubjectPage]
})
export class ElimSubjectPageModule {}
