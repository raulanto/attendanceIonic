import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController, Platform } from '@ionic/angular';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { NewlibraryPage } from '../newlibrary/newlibrary.page';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  public grupoid: any;
  public baseUrl: string = 'http://attendancedb.test/library';

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private loading: LoadingController,
    private platform: Platform,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { 
    //mandamos a pedir el id del grupo desde route paramMap
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');

  }
    // Una función que utiliza el valor de 'idperson'
    mostrar() {
      console.log('Valor grupoid en library:', this.grupoid);
    }
  
  ngOnInit() {
    this.mostrar();
    this.cargarLibrarys();
  }
 
  librarys: any = [];

  async cargarLibrarys(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url
      url: "http://attendancedb.test/library/librarys?id=" + this.grupoid,
      //url: "http://attendancedb.test/library?expand=group",
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
      componentProps: { groupID: this.grupoid }, // Pasar el ID del grupo como un parámetro
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
  }

  //BORRAR
  async alertEliminar(archivoid: any) {
    const alert = await this.alertCtrl.create({
      header: 'Archivo',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el archivo ' + archivoid + '?',
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.eliminar(archivoid);
          }
        }
      ]
    });
    await alert.present();
  }
  async eliminar(archivoid: any) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + archivoid,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(archivoid, 'El archivo con id ' + archivoid + ' ha sido eliminado');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  async alertEliminado(archivoid: any, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Archivo',
      subHeader: 'Eliminado',
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.regresar();
          },
        },
      ],
    });

    await alert.present();
  }
  private regresar() {
    this.router.navigate(['/tabs/library', this.grupoid]).then(() => {
      window.location.reload();
    });
  }


  
}

