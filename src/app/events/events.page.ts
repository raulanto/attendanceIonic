import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NeweventsPage } from '../newevents/newevents.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  baseUrl: string = "http://attendancedb.test/extracurricular";

  constructor(
    private loadingCtrl: LoadingController,
    private platform: Platform,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  busqueda:string = '';
  page:number = 1;
  totalEventos:number = 0;

  extra: any = [];

  ngOnInit() {
    this.loadExtra();
    this.contarEventos();
  }

  async loadExtra(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    let urlApi:string = '';
    if(this.busqueda === '') {
      urlApi = 'http://attendancedb.test/extracurricular?page=' + this.page;
    } else {
      urlApi = 'http://attendancedb.test/extracurricular/buscar/'+this.busqueda;
    }

    const response = await axios({
      method: 'get',
      //url : "http://attendancedb.test/extracurricular",
      //url: "http://attendancedb.test/extra-group/?expand=extracurricular,group,date,time,code,place",
      url : urlApi,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.extra = response.data;
      console.log(this.extra)
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    this.contarEventos();
    loading.dismiss();
  }



  async contarEventos() {
    let urlApi:string = '';
    if(this.busqueda === '') {
        urlApi = 'http://attendancedb.test/extracurricular/total';
    } else {
        urlApi = 'http://attendancedb.test/extracurricular/total/'+ this.busqueda;
    }
    const response = await axios({
        method: 'get',
        url : urlApi,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
    }).then( (response) => {
        this.totalEventos = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
  }
  
  pagina(event:any) {
  this.page = event.target.innerText;
  this.loadExtra();
  }
  
  handleInput(event:any) {
  this.busqueda = event.target.value.toLowerCase();
  this.loadExtra();
  }


  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NeweventsPage, // El componente que se mostrará en el modal
      componentProps: {
        'title': 'Crear Evento' //Agregar titulo como parametro
      },
      breakpoints: [0, 0.3, 0.5, 0.95, 1.1], // Configuración de puntos de quiebre
      initialBreakpoint: 1.1, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
  }

  async alertEliminar(idextra: any, name: any, code: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar evento',
      subHeader: name,
      message: '¿Estás seguro de eliminar el evento ' + code + '?',
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
            this.eliminar(idextra, code);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(idextra: any, code: any) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + idextra,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(code, 'El evento con ' + code + ' ha sido eliminado');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  async alertEliminado(idextra: any, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Evento',
      subHeader: 'Eliminado',
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
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

  private regresar() {
    this.router.navigate(['/tabs/events']).then(() => {
      window.location.reload();
    });
  }

  async editar(idextra: any) {

    const paginaModal = await this.modalCtrl.create({
    component: NeweventsPage,
    componentProps: {
        'idextra': idextra,
        'title': 'Modificar Evento'
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
        this.loadExtra();
    });
}

}