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
  public grupoid: any;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private loading: LoadingController
  ) {
    //mandamos a pedir el id del grupo desde route paramMap
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
   }
  listas: any = [];
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
      url: "http://attendancedb.test/listg/listas?id="+this.grupoid,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        //token Bearer 100-token
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.listas = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
