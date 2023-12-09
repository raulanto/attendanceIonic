import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaAluPage } from './asistencia-alu.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaAluPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaAluPageRoutingModule {}
