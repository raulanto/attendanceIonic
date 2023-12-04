import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModmajorPage } from './modmajor.page';

const routes: Routes = [
  {
    path: '',
    component: ModmajorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModmajorPageRoutingModule {}
