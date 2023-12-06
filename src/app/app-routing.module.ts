import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./carrusel/carrusel.module').then( m => m.CarruselPageModule)
  },

  //APARTADO DE LOGIN
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }, 

  //APARTADO DE SELECCIONAR USUARIO (REGISTRAR)
  {
    path: 'seleccion-ma',
    loadChildren: () => import('./seleccion-ma/seleccion-ma.module').then( m => m.SeleccionMaPageModule)
  }, 

  //APARTADO DE REGISTRAR USUARIO
  {
    path: 'alumno-form',
    loadChildren: () => import('./alumno-form/alumno-form.module').then( m => m.AlumnoFormPageModule)
  },
  {
    path: 'maestro-form',
    loadChildren: () => import('./maestro-form/maestro-form.module').then( m => m.MaestroFormPageModule)
  },

  //APARTADO DE GROUP
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then( m => m.GroupPageModule)
  },
  {
    path: 'newgroup',
    loadChildren: () => import('./newgroup/newgroup.module').then( m => m.NewgroupPageModule)
  },

  //APARTADO DE CLASSROOM
  {
    path: 'classroom',
    loadChildren: () => import('./classroom/classroom.module').then( m => m.ClassroomPageModule)
  },
  {
    path: 'newclassroom',
    loadChildren: () => import('./newclassroom/newclassroom.module').then( m => m.NewclassroomPageModule)
  },

  //APARTADO DE MAJOR
  {
    path: 'major',
    loadChildren: () => import('./major/major.module').then( m => m.MajorPageModule)
  },
  {
    path: 'newmajor',
    loadChildren: () => import('./newmajor/newmajor.module').then( m => m.NewmajorPageModule)
  },
  {
    path: 'modmajor',
    loadChildren: () => import('./modmajor/modmajor.module').then( m => m.ModmajorPageModule)
  },

  //APARTADO DE SUBJECT  
  {
    path: 'subject',
    loadChildren: () => import('./subject/subject.module').then( m => m.SubjectPageModule)
  },
  {
    path: 'newsubject',
    loadChildren: () => import('./newsubject/newsubject.module').then( m => m.NewsubjectPageModule)
  },
  {
    path: 'modsubject',
    loadChildren: () => import('./modsubject/modsubject.module').then( m => m.ModsubjectPageModule)
  },

  //Menu para acceder a Asistencia, library, notificaciones, etc.
    //Agrego la nueva ruta donde llevara el id del grupo, materia y codigo a un menu
  {
    path: 'menu1/:gro_id/:gro_subject/:gro_code',
    loadChildren: () => import('./menu1/menu1.module').then( m => m.Menu1PageModule)
  },

  //Menu para acceder a ver asistencia, tomar asistencia y codigo
    //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'asistencia/:grupoid',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'asistencia-detalle',
    loadChildren: () => import('./asistencia-detalle/asistencia-detalle.module').then( m => m.AsistenciaDetallePageModule)
  },

  //APARTADO DE LISTA 
    //Agrego la nueva ruta donde llevara el id del grupo 
  {
    path: 'lista/:grupoid',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'newlista',
    loadChildren: () => import('./newlista/newlista.module').then( m => m.NewlistaPageModule)
  },  

  //APARTADO DE CODIGOS
    //Agrego la nueva ruta donde llevara el id del grupo      
  {
    path: 'codigos/:grupoid',
    loadChildren: () => import('./codigos/codigos.module').then( m => m.CodigosPageModule)
  },
  //llamar modal para crear el codigo
  {
    path: 'codigo-generar',
    loadChildren: () => import('./codigo-generar/codigo-generar.module').then( m => m.CodigoGenerarPageModule)
  },
  {
    path: 'codigo-generado',
    loadChildren: () => import('./codigo-generado/codigo-generado.module').then( m => m.CodigoGeneradoPageModule)
  },


  //Menu para acceder a ver eventos y calificaciones
  //Agrego la nueva ruta donde llevara el id del grupo a un menu
  {
    path: 'menunoti/:grupoid',
    loadChildren: () => import('./menunoti/menunoti.module').then( m => m.MenunotiPageModule)
  },

  //APARTADO DE EVENTOS
    //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'notextracurricular/:grupoid',
    loadChildren: () => import('./notextracurricular/notextracurricular.module').then( m => m.NotextracurricularPageModule)
  },
  {
    path: 'newextracurricular',
    loadChildren: () => import('./newextracurricular/newextracurricular.module').then( m => m.NewextracurricularPageModule)
  },
    //Agrego la nueva ruta donde llevara el id del grupo    
  {
    path: 'extracurricular/:grupoid',
    loadChildren: () => import('./extracurricular/extracurricular.module').then( m => m.ExtracurricularPageModule)
  },

  //APARTADO DE GRADE 
    //Agrego la nueva ruta donde llevara el id del grupo   
  {
    path: 'grade/:grupoid',
    loadChildren: () => import('./grade/grade.module').then( m => m.GradePageModule)
  },
  {
    path: 'newgrade',
    loadChildren: () => import('./newgrade/newgrade.module').then( m => m.NewgradePageModule)
  },  
  {
    path: 'modgrade',
    loadChildren: () => import('./modgrade/modgrade.module').then( m => m.ModgradePageModule)
  },

  //APARTADO DE LIBRARY
    //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'library/:grupoid',
    loadChildren: () => import('./library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'newlibrary',
    loadChildren: () => import('./newlibrary/newlibrary.module').then( m => m.NewlibraryPageModule)
  },

  {
    path: 'question/:grupoid',
    loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'newquestion',
    loadChildren: () => import('./newquestion/newquestion.module').then( m => m.NewquestionPageModule)
  },
  {
    path: 'question-detail',
    loadChildren: () => import('./question-detail/question-detail.module').then( m => m.QuestionDetailPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
