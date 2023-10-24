import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {
  public idperson: any;
  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private loading: LoadingController
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

}
