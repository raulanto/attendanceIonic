import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdQuestionPageRoutingModule } from './upd-question-routing.module';

import { UpdQuestionPage } from './upd-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdQuestionPageRoutingModule
  ],
  declarations: [UpdQuestionPage]
})
export class UpdQuestionPageModule {}
