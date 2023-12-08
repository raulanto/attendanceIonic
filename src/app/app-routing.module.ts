import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then( m => m.GroupPageModule)
  },
  {
    path: 'newgroup',
    loadChildren: () => import('./newgroup/newgroup.module').then( m => m.NewgroupPageModule)
  },
  {
    path: 'classroom',
    loadChildren: () => import('./classroom/classroom.module').then( m => m.ClassroomPageModule)
  },
  {
    path: 'newclassroom',
    loadChildren: () => import('./newclassroom/newclassroom.module').then( m => m.NewclassroomPageModule)
  },
  
    //Agrego la nueva ruta donde llevara el id del grupo, materia y codigo a un menu
  {
    path: 'menu1/:gro_id/:gro_subject/:gro_code',
    loadChildren: () => import('./menu1/menu1.module').then( m => m.Menu1PageModule)
  },

  //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'asistencia/:grupoid',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'lista/:grupoid',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  },

  //Agrego la nueva ruta donde llevara el id del grupo a un menu
  {
    path: 'menunoti/:grupoid',
    loadChildren: () => import('./menunoti/menunoti.module').then( m => m.MenunotiPageModule)
  },

  //Agrego la nueva ruta donde llevara el id del grupo
  {
    path: 'notextracurricular/:grupoid',
    loadChildren: () => import('./notextracurricular/notextracurricular.module').then( m => m.NotextracurricularPageModule)
  },
  {
    path: 'extracurricular/:grupoid',
    loadChildren: () => import('./extracurricular/extracurricular.module').then( m => m.ExtracurricularPageModule)
  },
  {
    path: 'grade/:grupoid',
    loadChildren: () => import('./grade/grade.module').then( m => m.GradePageModule)
  },
  

  {
    path: 'modgrade',
    loadChildren: () => import('./modgrade/modgrade.module').then( m => m.ModgradePageModule)
  },
  {
    path: 'newextracurricular',
    loadChildren: () => import('./newextracurricular/newextracurricular.module').then( m => m.NewextracurricularPageModule)
  },
  {
    path: 'newgrade/:grupoid',
    loadChildren: () => import('./newgrade/newgrade.module').then( m => m.NewgradePageModule)
  },

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
    path: 'newlista',
    loadChildren: () => import('./newlista/newlista.module').then( m => m.NewlistaPageModule)
  },   {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'newevents',
    loadChildren: () => import('./newevents/newevents.module').then( m => m.NeweventsPageModule)
  },
  {
    path: 'updategrade/:califid/:grupoid',
    loadChildren: () => import('./updategrade/updategrade.module').then( m => m.UpdategradePageModule)
  },
  {
    path: 'addgrade/:grupoid',
    loadChildren: () => import('./addgrade/addgrade.module').then( m => m.AddgradePageModule)
  },
  {
    path: 'grade-alu',
    loadChildren: () => import('./grade-alu/grade-alu.module').then( m => m.GradeAluPageModule)
  },
  {
    path: 'extra-alu/:grupoid',
    loadChildren: () => import('./extra-alu/extra-alu.module').then( m => m.ExtraAluPageModule)
  },

 


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
