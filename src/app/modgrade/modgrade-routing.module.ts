import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModgradePage } from './modgrade.page';

const routes: Routes = [
  {
    path: '',
    component: ModgradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModgradePageRoutingModule {}
