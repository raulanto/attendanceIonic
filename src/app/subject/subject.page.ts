import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewSubjectPage } from '../new-subject/new-subject.page';
import { ElimSubjectPage } from '../elim-subject/elim-subject.page';
import { UpSubjectPage } from '../up-subject/up-subject.page';


@Component({
  selector: 'app-subject',
  templateUrl: 'subject.page.html',
  styleUrls: ['subject.page.scss']
})
export class SubjectPage {

  items: any = [];
  selectedSubject: any;
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router, private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alert: AlertController,
  ) { }

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

  subjects: any = [];
  ngOnInit() {
    this.loadSubjects();
  }
  subjectUrl:string = "http://attendanceproyect.atwebpages.com/subject"
  baseUrl:string = "http://attendancedb.test/subject"


  async loadSubjects(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://attendanceproyect.atwebpages.com/subject",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.subjects = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async newSubject() {
    const paginaModal = await this.modalCtrl.create({
    component: NewSubjectPage,
    breakpoints : [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();
}

async elimSubject() {
  const paginaModal = await this.modalCtrl.create({
  component: ElimSubjectPage,
  breakpoints : [0, 0.3, 0.5, 0.95],
  initialBreakpoint: 0.95
  });
  await paginaModal.present();
}

async UpSubject(selectedSubject : any) {
  const paginaModal = await this.modalCtrl.create({
    component: NewSubjectPage,
    componentProps: {
        'selectedSubject ': this.selectedSubject 
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

  seleccionarSubject(SubjectName: string) {
    this.selectedSubject = SubjectName;
    this.alertEliminar(SubjectName);
  }
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
            this.selectedSubject = selectedSubject;
            this.guardarDatos();
          }
        }
      ]
    });
    await alert.present();
  }

  async guardarDatos() {
    try {
      if (this.selectedSubject) {
        const eliminar = { subject_id: this.selectedSubject }; // Crea un objeto con la carrera a eliminar
        const response = await axios({
          method: 'delete',
          url: this.subjectUrl + "s/" + this.selectedSubject,
          withCredentials: true,
          data: eliminar,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 201) {
            this.alertEliminado(response.data.subject_id, 'La Carrera con el id ' + response.data.subject_id + ' ha sido eliminada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertEliminado(eliminar.subject_id, error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(eliminar.subject_id, error?.response?.data[0]?.message,"Este elemento no puede ser borrado porque entra en conflicto con un elemento externo");
          }
          if (error?.response?.status == 404) {
            this.alertEliminado(eliminar.subject_id, error?.response?.data[0]?.message,"Este elemento no ha sido encontrado");
          }
        });
      } else {
        // Mostrar un mensaje de error si no se ha seleccionado una carrera
        this.alertEliminado("", "No has seleccionado una carrera para eliminar", "Error");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async alertEliminado(selectedMajor: any, msg = "",  subMsg= "eliminado") {
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

  private regresar() {
    this.router.navigate(['./subject/subject.module']).then(() => {
    window.location.reload();
    });
}
}

