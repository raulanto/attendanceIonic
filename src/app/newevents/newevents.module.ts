import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeweventsPageRoutingModule } from './newevents-routing.module';

import { NeweventsPage } from './newevents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeweventsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NeweventsPage]
})
export class NeweventsPageModule {}
