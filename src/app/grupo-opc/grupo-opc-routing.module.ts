import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoOpcPage } from './grupo-opc.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoOpcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoOpcPageRoutingModule {}
