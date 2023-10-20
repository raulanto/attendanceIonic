import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
import { NewlibraryPage } from '../newlibrary/newlibrary.page';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  librarys: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    private platform: Platform,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.cargarLibrarys();
  }
 
  async cargarLibrarys(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url
      url: "http://attendancedb.test/library?expand=group",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.librarys = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  getIconName(libType: string): string {
    // Define los nombres de iconos para cada tipo de archivo
    switch (libType) {
      case 'Libro':
        return 'book-outline'; // Nombre del icono para libros
        case 'Video':
          return 'play-circle-outline'; // Nombre del icono para videos
      case 'Página web':
        return 'globe-outline'; // Nombre del icono para páginas web
      default:
        return 'document-outline'; // Icono por defecto para otros tipos
    }
  }
  
  openLibraryFile(libFile: string) {
    // Abre la URL del archivo en una nueva ventana o realiza la acción deseada
    if (libFile) {
      // Verifica que la URL no sea nula o vacía
      this.platform.ready().then(() => {
        window.open(libFile, '_blank');
      });
    }
  }
  
  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewlibraryPage, // El componente que se mostrará en el modal
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
  }
  

}

