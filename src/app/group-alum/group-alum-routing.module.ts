import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupAlumPage } from './group-alum.page';

const routes: Routes = [
  {
    path: '',
    component: GroupAlumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupAlumPageRoutingModule {}
