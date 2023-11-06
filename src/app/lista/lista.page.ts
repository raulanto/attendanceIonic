import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
        LoadingController, 
        ModalController, 
        AlertController } from '@ionic/angular';
import { ActivatedRoute, 
        Router } from '@angular/router';
import axios from 'axios';
import { NewlistaPage } from '../newlista/newlista.page';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  public grupoid: any;

  public baseUrl: string = 'http://attendancedb.test/listg/listas?id=';
  public eliminarUrl: string = "http://attendancedb.test/listg";

  listas: any = [];

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) {
    //mandamos a pedir el id del grupo desde route paramMap
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
   }

  ngOnInit() {
    this.cargarAsistencia()
  }

  //CARGAR INTEGRANTES/LISTA DE ASISTENCIA

  async cargarAsistencia(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      url: this.baseUrl+this.grupoid,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
      }
    }).then((response) => {
      this.listas = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }
  
  //CREAR INTEGRANTES/LISTA DE ASISTENCIA

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewlistaPage, // El componente que se mostrará en el modal
      componentProps: { groupID: this.grupoid }, // Pasar el ID del grupo como un parámetro
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
  }

  //BORRAR INTEGRANTE/LISTA DE ASISTENCIA
  
  async eliminar(integranteid:any) {
    const response = await axios({
    method: 'delete',
    url: this.eliminarUrl + '/' + integranteid,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
    }
    }).then((response) => {
    if (response?.status == 204) {
        this.alertEliminado(integranteid, ' El alumno ' + integranteid + ' ha sido eliminado');
    }
    }).catch((error) => {
    if (error?.response?.status == 500) {
        this.alertEliminado(integranteid, "No puedes eliminar porque existe informacion relacionada ");
    }
    });
  }

  async alertEliminado(integranteid: any, msg = "") {
    const alert = await this.alertCtrl.create({
    header: 'Alumno',
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

  async editar(listgid: string) {
    const paginaModal = await this.modalCtrl.create({
    component: NewlistaPage,
    componentProps: {
        'listgid': listgid
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
        this.cargarAsistencia();
    });
  }
  
  //VOLVER A CARGAR
  private regresar() {
    this.router.navigate(['lista', this.grupoid]).then(() => {
      window.location.reload();
    });
  }
}
