import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewQuestionPageRoutingModule } from './new-question-routing.module';
import { NewQuestionPage } from './new-question.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewQuestionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewQuestionPage],
})
export class NewQuestionPageModule {}