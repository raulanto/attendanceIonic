import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionPageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'classroom',
    loadChildren: () => import('./classroom/classroom.module').then( m => m.ClassroomPageModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then( m => m.GroupPageModule)
  },  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
