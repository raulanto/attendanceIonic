import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewSubjectPage } from '../new-subject/new-subject.page';
import { ElimSubjectPage } from '../elim-subject/elim-subject.page';

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
    private router: Router, private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) { }

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
  subjectUrl:string = "http://attendanceproyect.atwebpages.com/subject"
  baseUrl:string = "http://attendancedb.test/subject"


  async loadSubjects(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://attendanceproyect.atwebpages.com/subject",
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

  async newSubject() {
    const paginaModal = await this.modalCtrl.create({
    component: NewSubjectPage,
    breakpoints : [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();
}

async elimSubject() {
  const paginaModal = await this.modalCtrl.create({
  component: ElimSubjectPage,
  breakpoints : [0, 0.3, 0.5, 0.95],
  initialBreakpoint: 0.95
  });
  await paginaModal.present();
}

}