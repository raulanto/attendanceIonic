import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimSubjectPage } from './elim-subject.page';

const routes: Routes = [
  {
    path: '',
    component: ElimSubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimSubjectPageRoutingModule {}
