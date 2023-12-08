import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Menu1AlumPageRoutingModule } from './menu1-alum-routing.module';

import { Menu1AlumPage } from './menu1-alum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Menu1AlumPageRoutingModule
  ],
  declarations: [Menu1AlumPage]
})
export class Menu1AlumPageModule {}
