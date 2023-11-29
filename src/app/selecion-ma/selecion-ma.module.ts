import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecionMAPageRoutingModule } from './selecion-ma-routing.module';

import { SelecionMAPage } from './selecion-ma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecionMAPageRoutingModule
  ],
  declarations: [SelecionMAPage]
})
export class SelecionMAPageModule {}
