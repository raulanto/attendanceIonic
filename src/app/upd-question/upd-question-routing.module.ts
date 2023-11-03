import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdQuestionPage } from './upd-question.page';

const routes: Routes = [
  {
    path: '',
    component: UpdQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdQuestionPageRoutingModule {}
