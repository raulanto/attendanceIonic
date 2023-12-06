import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarruselPageRoutingModule } from './carrusel-routing.module';
import { RouterModule } from '@angular/router';
import { CarruselPage } from './carrusel.page';
import { BannerComponent } from '../components/banner/banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarruselPageRoutingModule,
    RouterModule,
    BannerComponent
  ],
  declarations:[CarruselPage]
})
export class CarruselPageModule {}
