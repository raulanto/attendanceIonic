import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoGeneradoPage } from './codigo-generado.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoGeneradoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoGeneradoPageRoutingModule {}
