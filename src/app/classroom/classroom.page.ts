import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
        LoadingController, 
        ModalController, 
        AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { NewclassroomPage } from '../newclassroom/newclassroom.page';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})

export class ClassroomPage implements OnInit {

  public baseUrl: string = "http://attendancedb.test/classroom";

  classrooms: any = [];

  constructor(
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  busqueda:string = '';
  page:number = 1;
  totalClassrooms:number = 0;

  ngOnInit() {
    this.cargarClassrooms();
    this.contarClassrooms();
  }
  
  //CARGAR SALONES

  async cargarClassrooms(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    let urlApi:string = '';
    if(this.busqueda === '') {
      urlApi = "http://attendancedb.test/classroom?page=" + this.page;
    } else {
      urlApi = "http://attendancedb.test/classroom/buscar/" + this.busqueda;
    }

    const response = await axios({
      method: 'GET',
      url: urlApi,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.classrooms = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
    this.contarClassrooms();
  }

  async contarClassrooms() {
    let urlApi:string = '';
    if(this.busqueda === '') {
      urlApi = 'http://attendancedb.test/classroom/total';
    } else {
      urlApi = 'http://attendancedb.test/classroom/total/' + this.busqueda;
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
        this.totalClassrooms = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
  }

  pagina(event:any) {
    this.page = event.target.innerText;
    this.cargarClassrooms();
  }
  
  handleInput(event:any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarClassrooms();
  }

  //CREAR NUEVO SALON

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewclassroomPage, // El componente que se mostrará en el modal
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarClassrooms();
    });
  }

  //BORRAR SALON
  
  async eliminar(classroomid:any) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + classroomid,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(classroomid, 'La clase ' + classroomid + ' ha sido eliminado');
      }
    }).catch((error) => {
      if (error?.response?.status == 500) {
        this.alertEliminado(classroomid, "No puedes eliminar porque existe informacion relacionada ");
      }
    });
  }

  async alertEliminado(classroomid: any, msg = "") {
    const alert = await this.alertCtrl.create({
    header: 'Salon',
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

  async editar(classroomid: string) {
    const paginaModal = await this.modalCtrl.create({
    component: NewclassroomPage,
    componentProps: {
        'classroomid': classroomid
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarClassrooms();
    });
  }
  
  //VOLVER A CARGAR
  private regresar() {
    this.router.navigate(['/classroom']).then(() => {
    window.location.reload();
    });
  }
  
}

