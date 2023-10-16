import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  groups: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  public alertButtons = ['Unirse'];
  public alertInputs = [
    {
      placeholder: 'Ingresa el código',
      attributes: {
        maxlength: 15,
      },
    },
    
  ];
  
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

  ngOnInit() {
    this.cargarGroups();
  }
 
  async cargarGroups(event?: InfiniteScrollCustomEvent) {
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
      this.groups = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
