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

  extras: any = [];

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
  totalEventos:number = 0;

  ngOnInit() {
    this.mostrar();
    this.cargarExtras();
    this.contarEventos();
  }

    //CARGAR EXTRA-GROUPS

    async cargarExtras(event?: InfiniteScrollCustomEvent) {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
      });
      await loading.present();
  
      let urlApi:string = '';
      if (this.busqueda === '') {
      //urlApi = 'http://attendancedb.test/extra-group/?expand=extracurricular,group,date,time,code,place&page=' + this.page;
      urlApi = `http://attendancedb.test/extra-group/extragroups?id=${this.grupoid}_expand=extracurricular&page=${this.page}`;
      } else {
      //urlApi = 'http://attendancedb.test/extra-group/buscar/'+this.busqueda + '?expand=extracurricular,group,date,time,code,place'+ this.page;
      urlApi = `http://attendancedb.test/extra-group/extragroups?id=${this.grupoid}&text=${this.busqueda}&_expand=extracurricular`;
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
        this.extras = response.data;
        event?.target.complete();
      }).catch(function (error) {
        console.log(error);
      });
      loading.dismiss();
      this.contarEventos();
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
          this.totalEventos = response.data;
      }).catch(function (error) {
          console.log(error);     
      });
    }

  pagina(event:any) {
    this.page = event.target.innerText;
    this.cargarExtras();
  }
  
  handleInput(event:any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarExtras();
  }

  //CREAR NUEVA CALIFICACION

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewextracurricularPage, // El componente que se mostrará en el modal
      breakpoints: [0, 0.3, 0.5, 0.95, 1.1], // Configuración de puntos de quiebre
      initialBreakpoint: 1.1, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarExtras();
  });
  }

  async eliminar(idextra: any, code: any) {
    try {
      const response = await axios({
        method: 'delete',
        url: this.baseUrl + '/' + idextra,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
      });
  
      if (response?.status == 204) {
        this.alertEliminado(code, 'El evento con ' + code + ' ha sido eliminado');
      } else {
        console.error('Error al eliminar:', response);
        this.alertEliminado(code, 'Error al eliminar el evento');
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
      this.alertEliminado(code, 'Error en la solicitud de eliminación');
    }
  }
  

    async alertEliminado(idextra: any, msg = "") {
      const alert = await this.alertCtrl.create({
        header: 'Evento',
        subHeader: 'Eliminado',
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

  async editar(idextra: any) {

    const paginaModal = await this.modalCtrl.create({
    component: NewextracurricularPage,
    componentProps: {
        'idextra': idextra
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
        this.cargarExtras();
    });
}
}