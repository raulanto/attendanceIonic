import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomAlumnPage } from './classroom-alumn.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomAlumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomAlumnPageRoutingModule {}
