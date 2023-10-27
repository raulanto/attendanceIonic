import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewclassroomPageRoutingModule } from './newclassroom-routing.module';

import { NewclassroomPage } from './newclassroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewclassroomPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewclassroomPage]
})
export class NewclassroomPageModule {}
