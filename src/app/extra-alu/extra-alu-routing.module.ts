import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtraAluPage } from './extra-alu.page';

const routes: Routes = [
  {
    path: '',
    component: ExtraAluPage
  },
  {
    path: 'extracurricular/:extcode',
    loadChildren: () => import('../extracurricular/extracurricular.module').then( m => m.ExtracurricularPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraAluPageRoutingModule {}