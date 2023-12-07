import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaGeneradaPage } from './asistencia-generada.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaGeneradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaGeneradaPageRoutingModule {}
