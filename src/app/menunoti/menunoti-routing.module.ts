import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenunotiPage } from './menunoti.page';

const routes: Routes = [
  {
    path: '',
    component: MenunotiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenunotiPageRoutingModule {}
