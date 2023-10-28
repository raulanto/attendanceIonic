import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { NewlistaPage } from '../newlista/newlista.page';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  public grupoid: any;
  public baseUrl: string = 'http://attendancedb.test/classroom';

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private loading: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
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
      method: 'GET',
      url: "http://attendancedb.test/listg/listas?id="+this.grupoid,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
      }
    }).then((response) => {
      this.listas = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewlistaPage, // El componente que se mostrará en el modal
      componentProps: { groupID: this.grupoid }, // Pasar el ID del grupo como un parámetro
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
  }

}
