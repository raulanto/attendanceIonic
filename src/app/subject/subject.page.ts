import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
//añadimos la libreria para el controlador de las alertas
@Component({
  selector: 'app-subject',
  templateUrl: 'subject.page.html',
  styleUrls: ['subject.page.scss']
})
export class SubjectPage {

  items: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    //añadimos al constructor el controlador
  ) { }

  //Este es el formulario en forma de alerta para poder regirstrar una nueva materia, lo mismo para las Carreras

  public alertButtons = ['Crear'];
  public alertInputs = [
    {
      placeholder: 'Nombre de la Materia',
      attributes: {
        maxlength: 60,
      },
    },
    {
      placeholder: 'Codigo de la Materia',
      attributes: {
        maxlength: 15,
      },
    },
    
  ];

  //creamos un metodo para iniciar la alerta 


  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Registro Nueva Materia',
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

  subject: any = [];
  ngOnInit() {
    this.loadSubjects();
  }

  


  async loadSubjects(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      // Url de Zarate      
      url: "http://attendancedb.test/subject",      
      // Url de Zarate      
      //url: "http://attendancebd.test/subject",
      // Url de Zarate      
      //url: "http://attendancedb1.test/subject",        
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.subject = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }




}