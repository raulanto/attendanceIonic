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
    path: 'codigos',
    loadChildren: () => import('./codigos/codigos.module').then( m => m.CodigosPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'lista-codigos',
    loadChildren: () => import('./lista-codigos/lista-codigos.module').then( m => m.ListaCodigosPageModule)
  },
  {
    path: 'extracurricular/:extcode',
    loadChildren: () => import('./extracurricular/extracurricular.module').then( m => m.ExtracurricularPageModule)
  },
  {
    path: 'notextracurricular',
    loadChildren: () => import('./notextracurricular/notextracurricular.module').then( m => m.NotextracurricularPageModule)
  },  {
    path: 'newextracurricular',
    loadChildren: () => import('./newextracurricular/newextracurricular.module').then( m => m.NewextracurricularPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
