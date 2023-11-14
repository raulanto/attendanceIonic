import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupPageRoutingModule } from './group-routing.module';

import { GroupPage } from './group.page';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    PaginacionModule
  ],
  declarations: [GroupPage]
})
export class GroupPageModule {}
