import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryAlumnPageRoutingModule } from './library-alumn-routing.module';

import { LibraryAlumnPage } from './library-alumn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryAlumnPageRoutingModule
  ],
  declarations: [LibraryAlumnPage]
})
export class LibraryAlumnPageModule {}
