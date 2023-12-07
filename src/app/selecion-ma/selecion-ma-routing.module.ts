import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelecionMAPage } from './selecion-ma.page';

const routes: Routes = [
  {
    path: '',
    component: SelecionMAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelecionMAPageRoutingModule {}
