import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradePage } from './grade.page';

const routes: Routes = [
  {
    path: '',
    component: GradePage
  },
  // MODIFICACIONES-----------------------------------------------------------
  {
    path: 'updategrade/:califid/:grupoid',
    loadChildren: () => import('../updategrade/updategrade.module').then( m => m.UpdategradePageModule)
  }
    // MODIFICACIONES---------------------------------------------------------
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradePageRoutingModule {}
