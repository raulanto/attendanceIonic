import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import {FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-elim-subject',
  templateUrl: './elim-subject.page.html',
  styleUrls: ['./elim-subject.page.scss'],
})
export class ElimSubjectPage {

  items: any = [];
  selectedSubject: any;
  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alert : AlertController,
    public formBuilder : FormBuilder,
    public router: Router,
  ) { }

  ngOnInit() {
    this.loadSubjects();
  }

  
  subject: any = [];
  baseUrl:string = "http://attendancedb.test/subject"
  subjectUrl:string = "http://attendanceproyect.atwebpages.com/subject"
  public eliminarCarrera!: FormGroup;


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
      this.subject = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmSelection() {
    if (this.selectedSubject) {
      // Realizar alguna acción si es necesario antes de asignar el valor
      // Por ejemplo, mostrar un cuadro de diálogo de confirmación.
      this.alertEliminar(this.selectedSubject);
    }
  }

  async alertEliminar(selectedSubject: any) {
    const alert = await this.alert.create({
      header: 'Maestro',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la Materia ' + selectedSubject + '?',
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
        const eliminar = { sub_id: this.selectedSubject }; // Crea un objeto con la carrera a eliminar
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
            this.alertEliminado(response.data.sub_id, 'La Carrera con el id ' + response.data.maj_id + ' ha sido eliminada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertEliminado(eliminar.sub_id, error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(eliminar.sub_id, error?.response?.data[0]?.message,"Este elemento no puede ser borrado porque entra en conflicto con un elemento externo");
          }
          if (error?.response?.status == 404) {
            this.alertEliminado(eliminar.sub_id, error?.response?.data[0]?.message,"Este elemento no ha sido encontrado");
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

  async alertEliminado(selectedSubject: any, msg = "",  subMsg= "eliminado") {
    const alert = await this.alert.create({
    header: 'Materia',
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
    this.router.navigate(['/subject/subject']).then(() => {
    window.location.reload();
    });
}

handleMajorSelection(event: any) {
  // Aquí puedes acceder al valor seleccionado con this.selectedMajor
  console.log("Carrera seleccionada:", this.selectedSubject);
}


  



}
