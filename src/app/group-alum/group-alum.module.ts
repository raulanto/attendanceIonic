import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupAlumPageRoutingModule } from './group-alum-routing.module';

import { GroupAlumPage } from './group-alum.page';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupAlumPageRoutingModule,
    PaginacionModule
  ],
  declarations: [GroupAlumPage]
})
export class GroupAlumPageModule {}
