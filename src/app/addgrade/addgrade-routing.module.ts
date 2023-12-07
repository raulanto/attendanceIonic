import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddgradePage } from './addgrade.page';

const routes: Routes = [
  {
    path: '',
    component: AddgradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddgradePageRoutingModule {}
