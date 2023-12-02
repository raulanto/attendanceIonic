import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenunotiPage } from './menunoti.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MenunotiPageRoutingModule } from './menunoti-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MenunotiPageRoutingModule
  ],
  declarations: [MenunotiPage]
})
export class MenunotiPageModule {}
