import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
        LoadingController, 
        ModalController, 
        AlertController,
        Platform } from '@ionic/angular';
import { ActivatedRoute, 
          Router } from '@angular/router';        
import axios from 'axios';
import { ModgradePage } from '../modgrade/modgrade.page';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.page.html',
  styleUrls: ['./grade.page.scss'],
})
export class GradePage implements OnInit {

  public grupoid: any;

  //baseUrl: string = "http://attendancedb.test/grade";
  baseUrl: string = "http://attendancedb.test/grade/grades?id="
  eliminarUrl: string = "http://attendancedb.test/grade";

  grades: any = [];

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl : LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private router: Router,
  ) { 
    //mandamos a pedir el id del grupo desde route paramMap
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
  }

  // Una función que utiliza el valor de 'groupid'
  mostrar() {
    console.log('Valor de grupoid en grade:', this.grupoid);
  }
  
  busqueda:string = '';
  page:number = 1;
  totalGrades:number = 0;

  ngOnInit() {
    this.mostrar();
    this.cargarGrades();
    this.contarGrades();
  }

  //CARGAR GRADES

  async cargarGrades(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    let urlApi:string = '';
		if (this.busqueda === '') {
			urlApi = `http://attendancedb.test/grade/grades?id=${this.grupoid}&page=${this.page}`;
		} else {
			urlApi = `http://attendancedb.test/grade/buscar/?text=${this.busqueda}&id=${this.grupoid}`;
		}

    const response = await axios({
      method: 'GET',
      // Url
      url: urlApi,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.grades = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
    this.contarGrades();
  }

  async contarGrades() {
    let urlApi:string = '';
		if (this.busqueda === '') {
			urlApi = `http://attendancedb.test/grade/total/?id=${this.grupoid}`;
		} else {
			urlApi = `http://attendancedb.test/grade/total/?text=${this.busqueda}&id=${this.grupoid}`;
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
        console.log(response);  
        this.totalGrades = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
  }

  pagina(event:any) {
    this.page = event.target.innerText;
    this.cargarGrades();
  }
  
  handleInput(event:any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarGrades();
  }

  //CREAR NUEVA CALIFICACION

  async new(idgrade: any) {
    const paginaModal = await this.modalCtrl.create({
      component: ModgradePage, // El componente que se mostrará en el modal
      componentProps: { 'idgrade': idgrade }, // Pasar el ID de la calificacion como un parámetro
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
      this.cargarGrades();
  });
  }

  async eliminar(idgrade:any) {
    const response = await axios({
    method: 'delete',
    url: this.eliminarUrl + '/' + idgrade,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
    }
    }).then((response) => {
    if (response?.status == 204) {
        this.alertEliminado(idgrade, ' El archivo ' + idgrade + ' ha sido eliminado');
    }
    }).catch((error) => {
    if (error?.response?.status == 500) {
        this.alertEliminado(idgrade, "No puedes eliminar porque existe informacion relacionada ");
    }
    });
  }


  async alertEliminado(archivoid: any, msg = "") {
    const alert = await this.alertCtrl.create({
    header: 'Calificacion',
    subHeader: 'Eliminar',
    message: msg,
    cssClass: 'alert-center',
    buttons: [
        {
        text: 'Continuar',
        role: 'cancel',
        handler: () => {
          this.regresar();
      },
        },
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
        this.cargarGrades();
    });
  }


  //VOLVER A CARGAR
  private regresar() {
    this.router.navigate(['grade', this.grupoid]).then(() => {
      window.location.reload();
    });
  }



}
