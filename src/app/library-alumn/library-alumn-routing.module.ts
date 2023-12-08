import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryAlumnPage } from './library-alumn.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryAlumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryAlumnPageRoutingModule {}
