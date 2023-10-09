import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarCodigoPage } from './generar-codigo.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarCodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarCodigoPageRoutingModule {}
