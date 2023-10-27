import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSubjectPage } from './new-subject.page';

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
export class NewSubjectPageRoutingModule {}
