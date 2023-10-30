import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpSubjectPage } from './up-subject.page';

const routes: Routes = [
  {
    path: '',
    component: UpSubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpSubjectPageRoutingModule {}
