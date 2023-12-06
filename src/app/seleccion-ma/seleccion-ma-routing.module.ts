import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionMaPage } from './seleccion-ma.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionMaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionMaPageRoutingModule {}
