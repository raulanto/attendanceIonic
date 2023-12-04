import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewmajorPage } from './newmajor.page';

const routes: Routes = [
  {
    path: '',
    component: NewmajorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewmajorPageRoutingModule {}
