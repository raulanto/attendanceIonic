import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpSubjectPageRoutingModule } from './up-subject-routing.module';

import { UpSubjectPage } from './up-subject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpSubjectPageRoutingModule
  ],
  declarations: [UpSubjectPage]
})
export class UpSubjectPageModule {}
