import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  
  {
    path: 'subject',
    loadChildren: () => import('./subject/subject.module').then( m => m.SubjectPageModule)
  },
  {
    path: 'major',
    loadChildren: () => import('./major/major.module').then( m => m.MajorPageModule)
  },
 
  {
    path: 'newmajor',
    loadChildren: () => import('./newmajor/newmajor.module').then( m => m.NewmajorPageModule)
  },
  {
    path: 'new-subject',
    loadChildren: () => import('./new-subject/new-subject.module').then( m => m.NewSubjectPageModule)
  },
  {
    path: 'up-major',
    loadChildren: () => import('./up-major/up-major.module').then( m => m.UpMajorPageModule)
  },
  {
    path: 'up-subject',
    loadChildren: () => import('./up-subject/up-subject.module').then( m => m.UpSubjectPageModule)
  },

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
