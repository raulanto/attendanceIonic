import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCodigosPage } from './lista-codigos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCodigosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCodigosPageRoutingModule {}
