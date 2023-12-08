import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeweventsPage } from './newevents.page';

const routes: Routes = [
  {
    path: '',
    component: NeweventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeweventsPageRoutingModule {}