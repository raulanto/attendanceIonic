import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewSubjectPage } from '../newsubject/newsubject.page';
import { ModsubjectPage } from '../modsubject/modsubject.page';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage {

  items: any = [];
  selectedSubject: any;

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router, 
    private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alert: AlertController,
  ) { }

  subjects: any = [];
  baseUrl: string = 'http://attendancedb.test/subject';


  public alertButtons = ['Crear'];
  public alertInputs = [
    {
      placeholder: 'Nombre de la Materia',
      attributes: {
        maxlength: 60,
      },
    },
    {
      placeholder: 'Codigo de la Materia',
      attributes: {
        maxlength: 15,
      },
    },

  ];

  busqueda:string = '';
  page:number = 1;
  totalSubjects:number = 0;

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Registro Nueva Materia',
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
    this.loadSubjects();
    this.contarSubjects();
  }

  //Metodo Get

  async loadSubjects(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    let urlApi:string = '';
    if(this.busqueda === '') {
      urlApi = this.baseUrl +'?page=' + this.page;
    } else {
      urlApi = this.baseUrl + '/buscar/'+this.busqueda + '?page=' + this.page ;
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
      this.subjects = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
    this.contarSubjects();
  }

  async contarSubjects() {
    let urlApi:string = '';
    if(this.busqueda === '') {
        urlApi = this.baseUrl + '/total';
    } else {
        urlApi = this.baseUrl + '/total/'+ this.busqueda;
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
        this.totalSubjects = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
}

pagina(event:any) {
  this.page = event.target.innerText;
  this.loadSubjects();
}

handleInput(event:any) {
  this.busqueda = event.target.value.toLowerCase();
  this.loadSubjects();
}

  async newSubject() {
    const paginaModal = await this.modalCtrl.create({
      component: NewSubjectPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
  }



  //Metodo Actualizar

  async UpSubject(selectedSubject: any) {
    console.log("Entrando en UpSubject con el siguiente valor de selectedSubject:", selectedSubject);
  
    const paginaModal = await this.modalCtrl.create({
      component: ModsubjectPage,
      componentProps: {
        'selectedSubject': selectedSubject
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
  
    paginaModal.onDidDismiss().then((data) => {
      this.loadSubjects();
    });
  }
  

  //Metodo Eliminar

  async alertEliminar(selectedSubject: any) {
    const alert = await this.alert.create({
      header: 'Alumno',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la carrera ' + selectedSubject + '?',
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

            this.guardarDatos(selectedSubject);
          }
        }
      ]
    });
    await alert.present();
  }

  async guardarDatos(selectedSubject: any) {
    try {
      if (selectedSubject) {
        // La condición verifica si selectedMajor tiene un valor.
        const response = await axios({
          method: 'delete',
          url: this.baseUrl + "/" + selectedSubject,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 201) {
            this.alertEliminado(selectedSubject, response.data.sub_id, 'La Carrera con el id ' + response.data.maj_id + ' ha sido eliminada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertEliminado(selectedSubject, error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(selectedSubject, error?.response?.data[0]?.message, "Este elemento no puede ser borrado porque entra en conflicto con un elemento externo");
          }
          if (error?.response?.status == 404) {
            this.alertEliminado(selectedSubject, error?.response?.data[0]?.message, "Este elemento no ha sido encontrado");
          }
        });
      } else {
        // Si selectedMajor no tiene valor, muestra un mensaje de error.
        this.alertEliminado("", "No has seleccionado una carrera para eliminar", "Error");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async alertEliminado(selectedSubject: String, msg = "", subMsg = "eliminado") {
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
            this.regresar();
          },
        },
      ],
    });

    await alert.present();
  }

  public regresar() {
    // Navega a la página "subject.page"
    this.router.navigate(['../subject/subject.page']).then(() => {
      // Recarga la página "subject.page"
      location.reload();
    });
  }
}


