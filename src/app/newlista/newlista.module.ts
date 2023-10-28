import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewlistaPageRoutingModule } from './newlista-routing.module';

import { NewlistaPage } from './newlista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewlistaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewlistaPage]
})
export class NewlistaPageModule {}
