import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewextracurricularPage } from '../newextracurricular/newextracurricular.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notextracurricular',
  templateUrl: './notextracurricular.page.html',
  styleUrls: ['./notextracurricular.page.scss'],
})
export class NotextracurricularPage implements OnInit {

  baseUrl: string = "http://attendancedb.test/extra-group";

  constructor(
    private loadingCtrl: LoadingController,
    private platform: Platform,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  extra: any = [];

  ngOnInit() {
    this.loadExtra();
  }

  async loadExtra(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      //url : "http://attendancedb.test/extracurricular",
      url: "http://attendancedb.test/extra-group/?expand=extracurricular,group,date,time,code,place",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.extra = response.data;
      console.log(this.extra)
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewextracurricularPage, // El componente que se mostrará en el modal
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
    this.router.navigate(['/tabs/notextracurricular']).then(() => {
      window.location.reload();
    });
  }

  async editar(idextra: any) {

    const paginaModal = await this.modalCtrl.create({
    component: NewextracurricularPage,
    componentProps: {
        'idextra': idextra
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