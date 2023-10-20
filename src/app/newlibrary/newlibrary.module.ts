import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewlibraryPageRoutingModule } from './newlibrary-routing.module';

import { NewlibraryPage } from './newlibrary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewlibraryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewlibraryPage]
})
export class NewlibraryPageModule {}
