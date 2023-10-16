import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  items: any = [];
  imagenPath: string = 'assets/icon/image.png';
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }


  public alertButtons = ['Crear'];
  public alertInputs = [
    {
      placeholder: 'Codigo de la Carrera',
      attributes: {
        maxlength: 15,
      },
    },
    {
      placeholder: 'Codigo de la Carrera',
      attributes: {
        maxlength: 15,
      },
    },
  ];

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Realizar una pregunta',
      inputs: [
        {
          name: 'nombreCarrera',
          type: 'text',
          placeholder: 'Nombre de la carrera',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }
  questions: any = [];
  ngOnInit() {
    this.cargarQuestions();

  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  async cargarQuestions(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url de Monica
      url: "http://attendancedb1.test/question?expand=tag,teacher,person",
      // Url de Zarate
      //url: "http://attendancebd.test/question?expand=tag,teacher,person",      
      // Url de Raul
      //url: "http://attendancedb1.test/question?expand=tag,teacher,person",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.questions = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
