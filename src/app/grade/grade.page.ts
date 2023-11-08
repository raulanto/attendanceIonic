import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModgradePage } from '../modgrade/modgrade.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.page.html',
  styleUrls: ['./grade.page.scss'],
})
export class GradePage implements OnInit {

  baseUrl: string = "http://attendancedb.test/grade";

  constructor(
    private loadingCtrl : LoadingController,
    private platform: Platform,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  grade:any = [];

  ngOnInit() {
    this.loadGrade();
  }

  async loadGrade(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message : 'Cargando',
        spinner : 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        //url : "http://attendancedb.test/extracurricular",
        url : "http://attendancedb.test/grade",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.grade = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}






  async alertEliminar(idgrade: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Calificación',
      message: '¿Estás seguro de eliminar esta calificación?',
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
            this.eliminar(idgrade);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(idgrade: any) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + idgrade,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(idgrade, 'La calificación ha sido eliminada');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  async alertEliminado(idgrade: any, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Califiación',
      subHeader: 'Eliminada',
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
    this.router.navigate(['/tabs/grade']).then(() => {
      window.location.reload();
    });
  }

  async editar(idgrade: any) {

    const paginaModal = await this.modalCtrl.create({
    component: ModgradePage,
    componentProps: {
        'idgrade': idgrade
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
        this.loadGrade();
    });
}
}
