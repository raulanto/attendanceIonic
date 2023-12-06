import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewquestionPageRoutingModule } from './newquestion-routing.module';
import { NewquestionPage } from './newquestion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewquestionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewquestionPage]
})
export class NewquestionPageModule {}
