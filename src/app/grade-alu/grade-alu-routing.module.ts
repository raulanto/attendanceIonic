import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradeAluPage } from './grade-alu.page';

const routes: Routes = [
  {
    path: '',
    component: GradeAluPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradeAluPageRoutingModule {}
