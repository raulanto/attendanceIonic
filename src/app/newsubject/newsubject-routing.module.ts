import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSubjectPage } from './newsubject.page';

const routes: Routes = [
  {
    path: '',
    component: NewSubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsubjectPageRoutingModule {}
