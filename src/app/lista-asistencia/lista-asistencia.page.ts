import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.page.html',
  styleUrls: ['./lista-asistencia.page.scss'],
})
export class ListaAsistenciaPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private loading: LoadingController
  ) { }
  asistencia: any = [];
  ngOnInit() {
    this.cargarAsistencia()
  }
  async cargarAsistencia(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://attendancedb.test/attendance",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.asistencia = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
