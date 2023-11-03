import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewclassroomPage } from './newclassroom.page';

const routes: Routes = [
  {
    path: '',
    component: NewclassroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewclassroomPageRoutingModule {}
