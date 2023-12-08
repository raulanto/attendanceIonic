import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodiogogPage } from './codiogog.page';

const routes: Routes = [
  {
    path: '',
    component: CodiogogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodiogogPageRoutingModule {}
