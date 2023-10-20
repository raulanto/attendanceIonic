import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewextracurricularPage } from './newextracurricular.page';

const routes: Routes = [
  {
    path: '',
    component: NewextracurricularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewextracurricularPageRoutingModule {}
