import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, Platform } from '@ionic/angular';
import axios from 'axios';

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
  
}

