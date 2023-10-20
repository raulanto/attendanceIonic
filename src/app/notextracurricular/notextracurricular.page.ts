import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewextracurricularPage } from '../newextracurricular/newextracurricular.page';

@Component({
  selector: 'app-notextracurricular',
  templateUrl: './notextracurricular.page.html',
  styleUrls: ['./notextracurricular.page.scss'],
})
export class NotextracurricularPage implements OnInit {

  constructor(
    private loadingCtrl : LoadingController,
    private platform: Platform,
    public modalCtrl: ModalController,
  ) { }

  extra:any = [];

  ngOnInit() {
    this.loadExtra();
  }

  async loadExtra(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message : 'Cargando',
        spinner : 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        //url : "http://attendancedb.test/extracurricular",
        url : "http://attendancedb.test/extra-group/?expand=extracurricular,group,date,time,code,place",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.extra = response.data;
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

}