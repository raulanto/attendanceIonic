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
  selector: 'app-grade-alu',
  templateUrl: './grade-alu.page.html',
  styleUrls: ['./grade-alu.page.scss'],
})
export class GradeAluPage implements OnInit {

  public grupoid: any;

  baseUrl: string = "http://attendance.test/grade/grades?id="
  eliminarUrl: string = "http://attendance.test/grade";

  grade: any = [];

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl : LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private router: Router,
  ) { 
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
  }

  mostrar() {
    console.log('Valor de grupoid en grade:', this.grupoid);
  }

  busqueda:string = '';
  page:number = 1;
  totalCalificaciones:number = 0;

  ngOnInit() {
    this.mostrar();
    this.loadGrade();
    this.contarCalificaciones();
  }

  async loadGrade(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    let urlApi:string = '';
		if (this.busqueda === '') {
			urlApi = `http://attendance.test/grade/grades?id=${this.grupoid}&page=${this.page}`;
		} else {
			urlApi = `http://attendance.test/grade/buscar/?text=${this.busqueda}&id=${this.grupoid}`;
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
      this.grade = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
    this.contarCalificaciones();
  }

  async contarCalificaciones() {
    let urlApi:string = '';
		if (this.busqueda === '') {
			urlApi = `http://attendance.test/grade/total/?id=${this.grupoid}`;
		} else {
			urlApi = `http://attendance.test/grade/total/?text=${this.busqueda}&id=${this.grupoid}`;
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

  async alertEliminar(idgrade: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Calificación',
      message: '¿Estás seguro de eliminar esta calificación?',
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
            this.eliminar(idgrade);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(idgrade: any) {
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
        this.alertEliminado(idgrade, 'La calificación ha sido eliminada');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  async alertEliminado(idgrade: any, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Califiación',
      subHeader: 'Eliminada',
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
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
        this.loadGrade();
    });
  }


  //VOLVER A CARGAR
  private regresar() {
    this.router.navigate(['grade', this.grupoid]).then(() => {
      window.location.reload();
    });
  }
}
