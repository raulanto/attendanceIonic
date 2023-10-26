import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {
  public idperson: any;
  public baseUrl: string = 'http://attendancedb.test/attendance';
  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private loading: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    //mandamos a pedir el id del grupo desde route paramMap
    this.idperson = this.route.snapshot.paramMap.get('idperson');
  }

  ngOnInit() {
    this.mostrar();
    this.cargarAsistencia();

  }

  // Una función que utiliza el valor de 'idperson'
  mostrar() {
    console.log('Valor de idperson en asistencia:', this.idperson);
  }

  asistencias: any = [];

  async cargarAsistencia(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://attendancedb.test/attendance/asistencias?id=" + this.idperson,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        //token Bearer 100-token
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.asistencias = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  //Borrar 


  async alertEliminar(person: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alumno',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar al estudiante con matrícula ' + person + '?',
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
            this.eliminar(person);
          }
        }
      ]
    });
    await alert.present();
  }
  async eliminar(person: any) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + 's/' + person,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(person, 'El alumno con id ' + person + ' ha sido eliminado');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  async alertEliminado(person: any, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Alumno',
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
    this.router.navigate(['/tabs/detalle-asistencia']).then(() => {
      window.location.reload();
    });
  }

}
