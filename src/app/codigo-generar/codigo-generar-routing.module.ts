import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoGenerarPage } from './codigo-generar.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoGenerarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoGenerarPageRoutingModule {}
