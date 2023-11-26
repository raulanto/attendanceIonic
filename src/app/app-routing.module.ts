import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./carrusel/carrusel.module').then( m => m.CarruselPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionPageModule)
  },
  //Agrego la nueva ruta donde llevara el id del grupo
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
  //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'asistencia/:grupoid',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  
  {
    path: 'lista-asistencia',
    loadChildren: () => import('./lista-asistencia/lista-asistencia.module').then( m => m.ListaAsistenciaPageModule)
  },
  //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'lista-asistencia/:grupoid',
    loadChildren: () => import('./lista-asistencia/lista-asistencia.module').then( m => m.ListaAsistenciaPageModule)
  },
  {
    path: 'generar-codigo',
    loadChildren: () => import('./generar-codigo/generar-codigo.module').then( m => m.GenerarCodigoPageModule)
  },
  //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'generar-codigo/:grupoid',
    loadChildren: () => import('./generar-codigo/generar-codigo.module').then( m => m.GenerarCodigoPageModule)
  },
  {
    path: 'grupo-opc',
    loadChildren: () => import('./grupo-opc/grupo-opc.module').then( m => m.GrupoOpcPageModule)
  },
  //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'grupo-opc/:grupoid',
    loadChildren: () => import('./grupo-opc/grupo-opc.module').then(m => m.GrupoOpcPageModule)
  },
  {
    path: 'detalle-asistencia',
    loadChildren: () => import('./detalle-asistencia/detalle-asistencia.module').then( m => m.DetalleAsistenciaPageModule)
  },
  //esta ruta nos mandara al despliege todas las asistencia que pertenecen a la persona
  {
    path: 'detalle-asistencia/:idperson',
    loadChildren: () => import('./detalle-asistencia/detalle-asistencia.module').then( m => m.DetalleAsistenciaPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
