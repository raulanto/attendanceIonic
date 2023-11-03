import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewlistaPage } from './newlista.page';

const routes: Routes = [
  {
    path: '',
    component: NewlistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewlistaPageRoutingModule {}
