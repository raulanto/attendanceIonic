import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Menu1AlumPage } from './menu1-alum.page';

const routes: Routes = [
  {
    path: '',
    component: Menu1AlumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Menu1AlumPageRoutingModule {}
