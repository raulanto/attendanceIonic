import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryAlumnPageRoutingModule } from './library-alumn-routing.module';

import { LibraryAlumnPage } from './library-alumn.page';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryAlumnPageRoutingModule,
    PaginacionModule
  ],
  declarations: [LibraryAlumnPage]
})
export class LibraryAlumnPageModule {}
