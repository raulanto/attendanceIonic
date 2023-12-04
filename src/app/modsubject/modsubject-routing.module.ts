import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModsubjectPage } from './modsubject.page';

const routes: Routes = [
  {
    path: '',
    component: ModsubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModsubjectPageRoutingModule {}
