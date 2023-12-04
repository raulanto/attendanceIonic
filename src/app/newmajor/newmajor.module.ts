import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewmajorPageRoutingModule } from './newmajor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewmajorPage } from './newmajor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewmajorPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewmajorPage]
})
export class NewmajorPageModule {}
