import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpMajorPage } from './up-major.page';

const routes: Routes = [
  {
    path: '',
    component: UpMajorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpMajorPageRoutingModule {}
