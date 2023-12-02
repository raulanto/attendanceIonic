import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtracurricularPage } from './extracurricular.page';

const routes: Routes = [
  {
    path: '',
    component: ExtracurricularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtracurricularPageRoutingModule {}
