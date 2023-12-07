import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
        LoadingController, 
        ModalController, 
        AlertController,
        Platform } from '@ionic/angular';
import { ActivatedRoute, 
          Router } from '@angular/router';        
import axios from 'axios';
import { NewextracurricularPage } from '../newextracurricular/newextracurricular.page';

@Component({
  selector: 'app-notextracurricular',
  templateUrl: './notextracurricular.page.html',
  styleUrls: ['./notextracurricular.page.scss'],
})
export class NotextracurricularPage implements OnInit {

  public grupoid: any;

  //baseUrl: string = "http://attendancedb.test/extra-group";
  baseUrl: string = "http://attendancedb.test/extra-group/extragroups?id="
  eliminarUrl: string = "http://attendancedb.test/extra-group";

  extra: any = [];

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
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
      console.log('Valor de grupoid en Eventos:', this.grupoid);
    }

  busqueda:string = '';
  page:number = 1;
  totalExtracurriculares:number = 0;

  ngOnInit() {
    this.mostrar();
    this.loadExtra();
    this.contarEventos();
  }


  async loadExtra(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    let urlApi:string = '';
    if(this.busqueda === '') {
      urlApi = `http://attendancedb.test/extra-group/extragroups?id=${this.grupoid}_expand=extracurricular&page=${this.page}`;
    } else {
      urlApi = `http://attendancedb.test/extra-group/extragroups?id=${this.grupoid}&text=${this.busqueda}&_expand=extracurricular`;
    }

    const response = await axios({
      method: 'get',
      //url : "http://attendancedb.test/extracurricular",
      //url: "http://attendancedb.test/extra-group/?expand=extracurricular,group,date,time,code,place",
      url : urlApi,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.extra = response.data;
      console.log(this.extra)
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    this.contarEventos();
    loading.dismiss();
  }



    async contarEventos() {
      let urlApi:string = '';
      if (this.busqueda === '') {
        //urlApi = 'http://attendancedb.test/extra-group/total';
        urlApi = `http://attendancedb.test/extra-group/total/?id=${this.grupoid}`;
      } else {
        //urlApi = 'http://attendancedb.test/extra-group/total/'+ this.busqueda;
        urlApi = `http://attendancedb.test/extra-group/total?id=${this.grupoid}&text=${this.busqueda}`;
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
          this.totalExtracurriculares = response.data;
      }).catch(function (error) {
          console.log(error);     
      });
    }

  pagina(event:any) {
    this.page = event.target.innerText;
    this.loadExtra();
  }
  
  handleInput(event:any) {
    this.busqueda = event.target.value.toLowerCase();
    this.loadExtra();
  }

  //CREAR NUEVA CALIFICACION

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewextracurricularPage, // El componente que se mostrará en el modal
      componentProps: {
        groupID: this.grupoid,
        'title': 'Crear Invitación' //Agregar titulo como parametro
      },
      breakpoints: [0, 0.3, 0.5, 0.95, 1.1], // Configuración de puntos de quiebre
      initialBreakpoint: 1.1, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.loadExtra();
  });
  }


  async alertEliminar(idextra: any, name: any, code: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar invitación',
      subHeader: code,
      message: '¿Estás seguro de eliminar la invitación a' + code + '?',
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
            this.eliminar(idextra, code);
          }
        }
      ]
    });
    await alert.present();
  }


  async eliminar(idextra: any, code: any) {
    const response = await axios({
      method: 'delete',
      url: this.eliminarUrl + '/' + idextra,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(code, 'La invtiación al evento' + code + ' ha sido eliminada');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
  

  async alertEliminado(idextra: any, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Invitación',
      subHeader: 'ELIMINADA',
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

  private regresar() {
    this.router.navigate(['/tabs/notextracurricular']).then(() => {
      window.location.reload();
    });
  }

  async editar(idextra: any, name: any, code: any) {

    const paginaModal = await this.modalCtrl.create({
    component: NewextracurricularPage,
    componentProps: {
        'idextra': idextra,
        'extcode': code,
        'extname': name,
        'title': 'Modificar Invitación'
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
      this.loadExtra();
    });
}
}