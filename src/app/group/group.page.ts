import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
        LoadingController, 
        ModalController, 
        AlertController } from '@ionic/angular';
import { Router } from '@angular/router';        
import axios from 'axios';
import { NewgroupPage } from '../newgroup/newgroup.page';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})

export class GroupPage implements OnInit {

  public baseUrl: string = "http://attendancedb.test/group";

  grupos: any = [];

  constructor(
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarGrupos();
  }

  //CARGAR GRUPOS
 
  async cargarGrupos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      url: this.baseUrl + "?expand=subject,teacher,classroom",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.grupos = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  //CREAR NUEVO SALON

  async new() {
    // Crear una página modal utilizando el controlador de modales 
    const paginaModal = await this.modalCtrl.create({
      component: NewgroupPage, // El componente que se mostrará en el modal
      breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
      initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
    });
    // Presentar la página modal en la interfaz de usuario
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarGrupos();
  });
  }

  //BORRAR SALON
  
  async eliminar(groupid:any) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + groupid,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(groupid, 'El grupo ' + groupid + ' ha sido eliminado');
      }
    }).catch((error) => {
    if (error?.response?.status == 500) {
      this.alertEliminado(groupid, "No puedes eliminar porque existe informacion relacionada ");
    }
    });
  }

  async alertEliminado(groupid: any, msg = "") {
    const alert = await this.alertCtrl.create({
    header: 'Grupo',
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

  async editar(groupid: string) {
    const paginaModal = await this.modalCtrl.create({
    component: NewgroupPage,
    componentProps: {
        'groupid': groupid
    },
    breakpoints: [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
        this.cargarGrupos;
    });
  }
  
  //VOLVER A CARGAR
  private regresar() {
    this.router.navigate(['/group']).then(() => {
      window.location.reload();
    });
  }

  public alertButtons = ['Unirse'];
  public alertInputs = [
    {
      placeholder: 'Ingresa el código',
      attributes: {
        maxlength: 15,
      },
    },
    
  ];

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Unirse a un equipo con un código',
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
  
}
