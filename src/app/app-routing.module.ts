import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
    //Agrego la nueva ruta donde llevara el id del grupo, materia y codigo
  {
    path: 'menu1/:gro_id/:gro_subject/:gro_code',
    loadChildren: () => import('./menu1/menu1.module').then( m => m.Menu1PageModule)
  },
    //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'library/:grupoid',
    loadChildren: () => import('./library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'newlibrary',
    loadChildren: () => import('./newlibrary/newlibrary.module').then( m => m.NewlibraryPageModule)
  },
  {
    path: 'classroom',
    loadChildren: () => import('./classroom/classroom.module').then( m => m.ClassroomPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionPageModule)
  },
  {
    path: 'subject',
    loadChildren: () => import('./subject/subject.module').then( m => m.SubjectPageModule)
  },
  {
    path: 'major',
    loadChildren: () => import('./major/major.module').then( m => m.MajorPageModule)
  },
  {
    path: 'elim-major',
    loadChildren: () => import('./elim-major/elim-major.module').then( m => m.ElimMajorPageModule)
  },
  {
    path: 'elim-subject',
    loadChildren: () => import('./elim-subject/elim-subject.module').then( m => m.ElimSubjectPageModule)
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
