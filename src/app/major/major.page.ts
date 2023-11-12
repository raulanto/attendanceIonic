import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewmajorPage } from '../newmajor/newmajor.page';
import { ElimMajorPage } from '../elim-major/elim-major.page';
import { UpMajorPage } from '../up-major/up-major.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
@Component({
  selector: 'app-major',
  templateUrl: './major.page.html',
  styleUrls: ['./major.page.scss'],
})
export class MajorPage {

  items: any = [];
  selectedMajor: any;

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router, private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alert: AlertController,
  ) { }
  busqueda:string = '';
  page:number = 1;
  totalMajors:number = 0;
  
  majors: any = [];
  majorUrl: string = "http://attendanceproyect.atwebpages.com/major"
  baseUrl: string = "http://attendancedb.test/major"

  public alertButtons = ['Crear'];
  public alertInputs = [
    {
      placeholder: 'Nombre de la Carrera',
      attributes: {
        maxlength: 60,
      },
    },
    {
      placeholder: 'Codigo de la Carrera',
      attributes: {
        maxlength: 15,
      },
    },

  ];

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Registro Nueva Carrera',
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

  ngOnInit() {
    this.loadMajor();
    this.contarMajors();
  }

  //Metodo GET comienza

  async loadMajor(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    
    const response = await axios({
      method: 'get',
      url: "http://attendancedb.test/major?per-page=50",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.majors = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async contarMajors() {
    let urlApi:string = '';
    if(this.busqueda === '') {
        urlApi = 'http://attendancedb.test/major';
    } else {
        urlApi = 'http://attendancedb.test/major/total/'+ this.busqueda;
    }
    const response = await axios({
        method: 'get',
        url : urlApi,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.majors = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
}

pagina(event:any) {
  this.page = event.target.innerText;
  this.loadMajor();
}

handleInput(event:any) {
  this.busqueda = event.target.value.toLowerCase();
  this.loadMajor();
}

  async newMajor() {
    const paginaModal = await this.modalCtrl.create({
      component: NewmajorPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
  }

  async elimMajor() {
    const paginaModal = await this.modalCtrl.create({
      component: ElimMajorPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
  }

  //Metodo Actualizar comienza

  async UpMajor(selectedMajor: any) {

    const paginaModal = await this.modalCtrl.create({
      component: UpMajorPage,
      componentProps: {
        'selectedMajor': selectedMajor
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();

    paginaModal.onDidDismiss().then((data) => {
      this.loadMajor();
    });
  }

  //Metodo Eliminar comienza

  async alertEliminar(selectedMajor: any) {
    const alert = await this.alert.create({
      header: 'Carrera',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la carrera ' + selectedMajor + '?',
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
            this.guardarDatos(selectedMajor);
          }
        }
      ]
    });
    await alert.present();
  }

  async guardarDatos(selectedMajor: any) {
    try {
      const agregar = selectedMajor;
      const response = await axios({
        method: 'delete',
        url: this.majorUrl + "s/" + selectedMajor,
        data: agregar,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
      }).then((response) => {
        if (response?.status == 201) {
          this.alertGuardado(response.data.maj_id, 'La Carrera con el id ' + response.data.maj_id + ' ha sido Eliminada');
        }
      }).catch((error) => {
        if (error?.response?.status == 422) {
          this.alertGuardado(agregar.maj_id, error?.response?.data[0]?.message, "Error");
        }
        if (error?.response?.status == 500) {
          this.alertGuardado(selectedMajor, error?.response?.data[0]?.message, "Este elemento no puede ser borrado porque entra en conflicto con un elemento externo");
        }
        if (error?.response?.status == 404) {
          this.alertGuardado(selectedMajor, error?.response?.data[0]?.message, "Este elemento no ha sido encontrado");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async alertGuardado(selectedMajor: any, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Carrera',
      subHeader: subMsg,
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
            this.modalCtrl.dismiss();
            this.regresar();

          },
        },
      ],
    });

    await alert.present();
  }

  private regresar() {
    // Navega a la página "subject.page"
    this.router.navigate(['../major/major.page']).then(() => {
      // Recarga la página "subject.page"
      location.reload();
    });
  }

  /*
  async guardarDatos(selectedMajor: any) {
    try {
      if (selectedMajor) {
        const response = await axios({
          method: 'delete',
          url: this.majorUrl + "s/" + selectedMajor,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 201) {
            this.alertEliminado(selectedMajor, 'La Carrera con el id ' + response.data.maj_id + ' ha sido eliminada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertEliminado(error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(error?.response?.data[0]?.message,"Este elemento no puede ser borrado porque entra en conflicto con un elemento externo");
          }
          if (error?.response?.status == 404) {
            this.alertEliminado(error?.response?.data[0]?.message,"Este elemento no ha sido encontrado");
          }
        });
      } else {
        // Mostrar un mensaje de error si no se ha seleccionado una carrera
        this.alertEliminado("", "No has seleccionado una carrera para eliminar", "Error");
      }
    } catch (e) {
      console.log(e);
    }
  }*/




}
