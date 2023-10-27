import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { NewgroupPage } from '../newgroup/newgroup.page';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
  ) { }

  grupos: any = [];

  ngOnInit() {
    this.cargarGrupos();
  }
 
  async cargarGrupos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url
      url: "http://attendancedb.test/group?expand=subject,teacher,classroom",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.grupos = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }


  public alertButtons = ['Unirse'];
  public alertInputs = [
    {
      placeholder: 'Ingresa el código',
      attributes: {
        maxlength: 15,
      },
    },
    
  ];

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewgroupPage, // El componente que se mostrará en el modal
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
  }
  
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Unirse a un equipo con un código',
      inputs: this.alertInputs,
      buttons: [
        {
          text: this.alertButtons[0],
          handler: (data) => {
            // Manejar los datos ingresados en el formulario aquí
            console.log('Datos del formulario:', data);
          },
        }, 
      ],
    });

    await alert.present();
  }

}
