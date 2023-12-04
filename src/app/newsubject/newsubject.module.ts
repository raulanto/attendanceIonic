import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsubjectPageRoutingModule } from './newsubject-routing.module';

import { NewSubjectPage } from './newsubject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsubjectPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewSubjectPage]
})
export class NewsubjectPageModule {}
