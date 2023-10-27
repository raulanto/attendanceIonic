import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewSubjectPageRoutingModule } from './new-subject-routing.module';
import { NewSubjectPage } from './new-subject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSubjectPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewSubjectPage]
})
export class NewSubjectPageModule {}
