import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewlibraryPage } from './newlibrary.page';

const routes: Routes = [
  {
    path: '',
    component: NewlibraryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewlibraryPageRoutingModule {}
