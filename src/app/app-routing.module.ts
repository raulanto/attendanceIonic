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
    path: 'codigos/:grupoid',
    loadChildren: () => import('./codigos/codigos.module').then( m => m.CodigosPageModule)
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
    path: 'asistencia/:grupoid',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'lista-asistencia',
    loadChildren: () => import('./lista-asistencia/lista-asistencia.module').then( m => m.ListaAsistenciaPageModule)
  },
  {
    path: 'generar-codigo',
    loadChildren: () => import('./generar-codigo/generar-codigo.module').then( m => m.GenerarCodigoPageModule)
  },
  {
    path: 'generar-codigo/:grupoid',
    loadChildren: () => import('./generar-codigo/generar-codigo.module').then( m => m.GenerarCodigoPageModule)
  },
  {
    path: 'grupo-opc',
    loadChildren: () => import('./grupo-opc/grupo-opc.module').then( m => m.GrupoOpcPageModule)
  },
  {
    path: 'grupo-opc/:grupoid',
    loadChildren: () => import('./grupo-opc/grupo-opc.module').then(m => m.GrupoOpcPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
