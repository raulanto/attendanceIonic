import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotextracurricularPage } from './notextracurricular.page';

const routes: Routes = [
  {
    path: '',
    component: NotextracurricularPage
  },
  {
    path: 'extracurricular/:extcode',
    loadChildren: () => import('../extracurricular/extracurricular.module').then( m => m.ExtracurricularPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotextracurricularPageRoutingModule {}
