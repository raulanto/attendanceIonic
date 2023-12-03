import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimMajorPage } from './elim-major.page';

const routes: Routes = [
  {
    path: '',
    component: ElimMajorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimMajorPageRoutingModule {}
