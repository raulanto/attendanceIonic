import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModgradePage } from '../modgrade/modgrade.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AddgradePage } from '../addgrade/addgrade.page';

@Component({
  selector: 'app-updategrade',
  templateUrl: './updategrade.page.html',
  styleUrls: ['./updategrade.page.scss'],
})
export class UpdategradePage implements OnInit {

  public grupoid: any;
  public califid: any;


  // baseUrl: string = "http://attendancedb.test/grade-person";
  baseUrl: string = "http://attendancedb.test/grade-person/gradesp?id=";

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { 
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
    this.califid = this.route.snapshot.paramMap.get('califid');
  }

  mostrar() {
    console.log('Valor de grupoid en Eventos:', this.grupoid);
  }

  busqueda:string = '';
  page:number = 1;
  totalCalificaciones:number = 0;

  grades: any = [];

  ngOnInit() {
    this.mostrar();
    this.loadGrade();
    this.contarCalificaciones();
  }

  async loadGrade(event?: InfiniteScrollCustomEvent) {
    const calif = this.route.snapshot.paramMap.get('califid');
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    // let urlApi:string = '';
    // if(this.busqueda === '') {
    //   urlApi = 'http://attendancedb.test/grade-person/?expand=person,grade&page=' + this.page;
    // } else {
    //   urlApi = 'http://attendancedb.test/grade-person/buscar/'+this.busqueda + '?expand=person,grade'+ this.page;
    // }

    const response = await axios({
      method: 'get',
      url : this.baseUrl + calif,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
      }
    }).then((response) => {
      this.grades = response.data;
      console.log(this.grades)
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
        urlApi = 'http://attendancedb.test/grade-person/total';
    } else {
        urlApi = 'http://attendancedb.test/grade-person/total/'+ this.busqueda;
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

  private regresar() {
    this.router.navigate(['/tabs/updategrade']).then(() => {
      window.location.reload();
    });
  }

  async editar(idgrade: any) {

    const paginaModal = await this.modalCtrl.create({
    component: ModgradePage,
    componentProps: {
        'idgrade': idgrade
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
        this.loadGrade();
    });
}

async new() {
  // Crear una página modal utilizando el controlador de modales 
  //const califid = this.route.snapshot.paramMap.get('califid');
  const paginaModal = await this.modalCtrl.create({
    component: AddgradePage, // El componente que se mostrará en el modal
    componentProps: {
      'gid': this.califid,
      //'idgrade': califid,
      'title': 'Crear Invitación', //Agregar titulo como parametro
      grupoid: this.grupoid,
    },
    breakpoints: [0, 0.3, 0.5, 0.95, 1.1], // Configuración de puntos de quiebre
    initialBreakpoint: 1.1, // Ubicacion inicial del punto de quiebre
  });
  // Presentar la página modal en la interfaz de usuario
  await paginaModal.present();
  paginaModal.onDidDismiss().then((data) => {
    this.loadGrade();
});
}

}