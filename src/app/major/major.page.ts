import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewmajorPage } from '../newmajor/newmajor.page';
import { ElimMajorPage } from '../elim-major/elim-major.page';
import { UpMajorPage } from '../up-major/up-major.page';

@Component({
  selector: 'app-major',
  templateUrl: './major.page.html',
  styleUrls: ['./major.page.scss'],
})
export class MajorPage {

  items: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router, private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    
  ) { }

  public alertButtons = ['Crear'];
  public alertInputs = [
    {
      placeholder: 'Nombre de la Carrera',
      attributes: {
        maxlength: 60,
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
      header: 'Registro Nueva Carrera',
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


  majors: any = [];
  majorUrl:string = "http://attendanceproyect.atwebpages.com/major"
  baseUrl:string = "http://attendancedb.test/major"

  ngOnInit() {
    this.loadMajor();
  }
 

  async loadMajor(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://attendanceproyect.atwebpages.com/major",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.majors = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }



  async newMajor() {
    const paginaModal = await this.modalCtrl.create({
    component: NewmajorPage,
    breakpoints : [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();
}

async elimMajor() {
  const paginaModal = await this.modalCtrl.create({
  component: ElimMajorPage,
  breakpoints : [0, 0.3, 0.5, 0.95],
  initialBreakpoint: 0.95
  });
  await paginaModal.present();
}

async UpMajor() {
  const paginaModal = await this.modalCtrl.create({
  component: UpMajorPage,
  breakpoints : [0, 0.3, 0.5, 0.95],
  initialBreakpoint: 0.95
  });
  await paginaModal.present();
}




}
