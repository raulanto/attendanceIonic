import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarAsistenciaPage } from './tomar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: TomarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarAsistenciaPageRoutingModule {}
