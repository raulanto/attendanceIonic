import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewquestionPage } from './newquestion.page';

const routes: Routes = [
  {
    path: '',
    component: NewquestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewquestionPageRoutingModule {}
