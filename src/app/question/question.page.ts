import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, 
        LoadingController, 
        ModalController, 
        AlertController,
        Platform } from '@ionic/angular';
import { ActivatedRoute, 
          Router } from '@angular/router';        
import axios from 'axios';
import { NewquestionPage } from '../newquestion/newquestion.page';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})

export class QuestionPage implements OnInit {

  public grupoid: any;

  imagenPath: string = 'assets/icon/image.png';
  
  public baseUrl: string = 'http://attendancedb.test/question';

  busqueda: string = '';
  page: number = 1;
  totalQuestions: number = 0;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router,
    private alertCtrl: AlertController
  ) { this.grupoid = this.route.snapshot.paramMap.get('grupoid');}

  questions: any = [];

  ngOnInit() {
    this.cargarQuestions();
    this.contarQuestions();
  }

  async cargarQuestions(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    let urlApi: string = '';
    if (this.busqueda === '') {
      urlApi = 'http://attendancedb.test/question?expand=tag,teacher,person&page=' + this.page;
    } else {
      urlApi = 'http://attendancedb.test/question/buscar/' + this.busqueda + '?expand=tag,teacher,person&page=' + this.page;
    }
    const response = await axios({
      method: 'GET',
      url: urlApi,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.questions = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
    this.contarQuestions();
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
    component: NewquestionPage,
    breakpoints : [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarQuestions();
    });
  }

  async contarQuestions() {
  let urlApi: string = '';
  if (this.busqueda === '') {
    urlApi = 'http://attendancedb.test/question/total';
  } else {
    urlApi = 'http://attendancedb.test/question/total/' + this.busqueda;
  }
  const response = await axios({
    method: 'get',
    url: urlApi,
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer 100-token'
    }
  }).then((response) => {
    this.totalQuestions = response.data;
  }).catch(function (error) {
    console.log(error);
    
  });
}

pagina(event: any) {
  this.page = event.target.innerText;
  this.cargarQuestions();
}
handleInput(event: any) {
  this.busqueda = event.target.value.toLowerCase();
  this.cargarQuestions();
}
async editar(id: number) {
  const paginaModal = await this.modalCtrl.create({
    component: NewquestionPage,
    componentProps: {
      'id': id
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
  });
  await paginaModal.present();
  paginaModal.onDidDismiss().then((data) => {
    this.cargarQuestions();
  });
}
async alertEliminar(person: any) {
  const alert = await this.alertCtrl.create({
    header: 'Question',
    subHeader: 'Eliminar',
    message: '¿Estás seguro de eliminar la pregunta con id: ' + person + '?',
    cssClass: 'alert-center',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Confirmar',
        role: 'confirm',
        handler: () => {
          this.eliminar(person);
        }
      }
    ]
  });
  await alert.present();
}
async eliminar(person: any) {
  const response = await axios({
    method: 'delete',
    url: this.baseUrl + 's/' + person,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 100-token'
    }
  }).then((response) => {
    if (response?.status == 204) {
      this.alertEliminado(person, 'La question con id ' + person + ' ha sido eliminado');
    }
  }).catch(function (error) {
    console.log(error);
  });
}
async alertEliminado(person: any, msg = "") {
  const alert = await this.alertCtrl.create({
    header: 'Question',
    subHeader: 'Eliminada',
    message: msg,
    cssClass: 'alert-center',
    buttons: [
      {
        text: 'Salir',
        role: 'confirm',
        handler: () => {
          this.regresar();
        },
      },
    ],
  });
  await alert.present();
  alert.onDidDismiss().then((data) => {
    this.cargarQuestions();
  });
}
private regresar() {
  this.router.navigate(['/tabs/question']).then(() => {
    window.location.reload();
  });
}
}