import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraAluPageRoutingModule } from './extra-alu-routing.module';

import { ExtraAluPage } from './extra-alu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtraAluPageRoutingModule
  ],
  declarations: [ExtraAluPage]
})
export class ExtraAluPageModule {}
