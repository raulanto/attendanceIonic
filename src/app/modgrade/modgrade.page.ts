import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-modgrade',
  templateUrl: './modgrade.page.html',
  styleUrls: ['./modgrade.page.scss'],
})
export class ModgradePage implements OnInit {

  // MODIFICACIONES-----------------------------------------------------------
  baseUrl: string = "http://attendancedb.test/grade-person";
  // MODIFICACIONES-----------------------------------------------------------

  @Input() idgrade: any | undefined;

  private editarDatos = [];

  public grades!: FormGroup; //Sirve para ingresar datos de "libros"

  // MODIFICACIONES-----------------------------------------------------------
  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'graper_score': [{ type: 'required', message: 'Calificación requerida' }],
    'graper_commit': [{ type: 'required', message: 'Comentario requerido' }],
  };
  // MODIFICACIONES-----------------------------------------------------------

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.formulario();
    if (this.idgrade !== undefined) {
      this.getDetalles();
    }
  }

  private formulario() {
    // MODIFICACIONES-----------------------------------------------------------
    // Crear el formulario reactivo con campos y validaciones
    this.grades = this.formBuilder.group({
      graper_score: ['', [Validators.required]],
      graper_commit: ['', [Validators.required]],
      // MODIFICACIONES-----------------------------------------------------------
    });
  }

  async guardarDatos() {
    try {
      const grades = this.grades?.value; //Obtener los valores del formulario


      if (this.idgrade === undefined) {
        const response = await axios({
          method: 'post',
          url: this.baseUrl,
          data: grades, // Datos del libro para enviar al servidor
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token',
          }
        }).then((response) => {//Llama la alerta en caso de exito
          if (response?.status == 201) {
            this.alertGuardado('La calificación ha sido registrado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(error?.response?.data[0]?.message, "Error");
          }
        });
      } else {
        const response = await axios({
        method: 'put',
        url: this.baseUrl + '/' + this.idgrade,
        data: grades,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
        }
        }).then((response) => {
            if (response?.status == 200) {
                this.alertGuardado('La calificación ha sido actualizada');
            }
            }).catch((error) => {
            if (error?.response?.status == 422) {
                this.alertGuardado(error?.response?.data[0]?.message, "Error");
            }
        });
    }
} catch (e) {
    console.log(e);
}
}

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.grades.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(msg = "", subMsg = "Actualizada") {
    const alert = await this.alert.create({
      header: 'Calificación', //Titulo de nuestra alerta
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
          },
        },
      ],
    });

    await alert.present();
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.idgrade,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.grades.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(function (error) {
      console.log(error);
    });
  }

}
