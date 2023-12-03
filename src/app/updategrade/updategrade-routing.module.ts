import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdategradePage } from './updategrade.page';

const routes: Routes = [
  {
    path: '',
    component: UpdategradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdategradePageRoutingModule {}
