import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { PaginacionModule } from '../components/paginacion/paginacion.module';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {

  constructor(
    private loadingCtrl : LoadingController,
  ) { }

  busqueda:string = '';
  page:number = 1;
  totalCalificaciones:number = 0;

  grade:any = [];

  baseUrl : string = "http://attendancedb.test/grade";

  ngOnInit() {
    this.loadGrade();
    this.contarCalificaciones();
  }

  async loadGrade(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message : 'Cargando',
        spinner : 'bubbles',
    });
    await loading.present();

    let urlApi:string = '';
    if(this.busqueda === '') {
      urlApi = 'http://attendancedb.test/grade?page=' + this.page;
    } else {
      urlApi = 'http://attendancedb.test/grade/buscar/'+this.busqueda;
    }

    const response = await axios({
        method: 'get',
        //url : "http://attendancedb.test/extracurricular",
        //url : "http://attendancedb.test/grade",
        url : urlApi,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
    }).then( (response) => {
        this.grade = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    this.contarCalificaciones();
    loading.dismiss();
}

async contarCalificaciones() {
  let urlApi:string = '';
  if(this.busqueda === '') {
      urlApi = 'http://attendancedb.test/grade/total';
  } else {
      urlApi = 'http://attendancedb.test/grade/total/'+ this.busqueda;
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
      this.totalCalificaciones = response.data;
  }).catch(function (error) {
      console.log(error);     
  });
}

pagina(event:any) {
this.page = event.target.innerText;
this.loadGrade();
}

handleInput(event:any) {
this.busqueda = event.target.value.toLowerCase();
this.loadGrade();
}

}