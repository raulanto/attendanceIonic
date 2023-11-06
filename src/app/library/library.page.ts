import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
        LoadingController, 
        ModalController, 
        AlertController,
        Platform } from '@ionic/angular';
import { ActivatedRoute, 
        Router } from '@angular/router';
import axios from 'axios';
import { NewlibraryPage } from '../newlibrary/newlibrary.page';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  
  public grupoid: any;

  public baseUrl: string = "http://attendancedb.test/library/librarys?id=";
  public eliminarUrl: string = "http://attendancedb.test/library";

  librarys: any = [];

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private platform: Platform,
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
    this.cargarLibrarys();
    this.mostrar();
  }

  //CARGAR ARCHIVOS

  async cargarLibrarys(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url
      url: this.baseUrl + this.grupoid,
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
  
  //CREAR NUEVO ARCHIVO

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

  //BORRAR ARCHIVO

  async eliminar(archivoid:any) {
    const response = await axios({
    method: 'delete',
    url: this.eliminarUrl + '/' + archivoid,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
    }
    }).then((response) => {
    if (response?.status == 204) {
        this.alertEliminado(archivoid, ' El archivo ' + archivoid + ' ha sido eliminado');
    }
    }).catch((error) => {
    if (error?.response?.status == 500) {
        this.alertEliminado(archivoid, "No puedes eliminar porque existe informacion relacionada ");
    }
    });
  }

  async alertEliminado(archivoid: any, msg = "") {
    const alert = await this.alertCtrl.create({
    header: 'Archivo',
    subHeader: 'Eliminar',
    message: msg,
    cssClass: 'alert-center',
    buttons: [
        {
        text: 'Continuar',
        role: 'cancel',
        handler: () => {
          this.regresar();
      },
        },
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

  //VOLVER A CARGAR
  private regresar() {
    this.router.navigate(['library', this.grupoid]).then(() => {
      window.location.reload();
    });
  }
}

