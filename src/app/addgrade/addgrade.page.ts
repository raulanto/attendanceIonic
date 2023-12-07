import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { ActivatedRoute, 
  Router } from '@angular/router'; 

@Component({
  selector: 'app-addgrade',
  templateUrl: './addgrade.page.html',
  styleUrls: ['./addgrade.page.scss'],
})
export class AddgradePage implements OnInit {

  baseUrl: string = "http://attendancedb.test/grade-person";
  personaUrl: string = 'http://attendancedb.test/listg/listas?id=';
  groupUrl: string = "http://attendancedb.test/grade";

  @Input() idgrade: any | undefined;

  @Input() title: string = '';

  public grupoid: any;

  private editarDatos = [];

  public grad!: FormGroup; //Sirve para ingresar datos de "libros"

  calificaciones: any = [];

  personas: any = [];

  mensajes_validacion: any = {
    'graper_fkperson': [{ type: 'required', message: 'Nombre del alumno requerido' }],
    'graper_fkgradre': [{ type: 'required', message: 'Asignación requerida' }],
    'graper_commit': [{ type: 'required', message: 'Comentario requerido' }],
    'graper_score': [{ type: 'required', message: 'Calificación requerida' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
  ) { 
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
  }

  ngOnInit() {
    this.cargarPersonas();
    // MODIFICACIONES-----------------------------------------------------------
    this.formulario();
    if (this.idgrade !== undefined) {
      this.getDetalles();
    }
  }

  mostrar() {
    console.log('Valor de grupoid en newgrades:', this.grupoid);
  }

  async cargarPersonas() {
    const response = await axios({
    method: 'get',
    url : this.personaUrl+this.grupoid,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
    }).then( (response) => {
    this.personas = response.data;
    }).catch(function (error) {
      // MODIFICACIONES-----------------------------------------------------------
    console.log(error);
    // MODIFICACIONES-----------------------------------------------------------
    });
}

  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.grad = this.formBuilder.group({
      graper_fkperson: ['', [Validators.required]],
      graper_fkgrade: ['', [Validators.required]],
      graper_commit: ['', [Validators.required]],
      graper_score: ['', [Validators.required]],
    });
    // MODIFICACIONES-----------------------------------------------------------
  }

  async guardarDatos() {
    try {
      const grad = this.grad?.value; //Obtener los valores del formulario


      if (this.idgrade === undefined) {
        const response = await axios({
          method: 'post',
          url: this.baseUrl,
          data: grad, // Datos del libro para enviar al servidor
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token',
          }
        }).then((response) => {//Llama la alerta en caso de exito
          if (response?.status == 201) {
            // MODIFICACIONES-----------------------------------------------------------
            this.alertGuardado(response.data.graper_id, 'La calificación ha sido enviada', "ENVIADA");
            // MODIFICACIONES-----------------------------------------------------------
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            // MODIFICACIONES-----------------------------------------------------------
            this.alertGuardado(grad.graper_id, error?.response?.data[0]?.message, "Error");
            // MODIFICACIONES-----------------------------------------------------------
          }
        });
      } else {
        const response = await axios({
        method: 'put',
        url: this.baseUrl + '/' + this.idgrade,
        data: grad,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
        }
        }).then((response) => {
            if (response?.status == 200) {
              // MODIFICACIONES-----------------------------------------------------------
                this.alertGuardado(response.data.graper_id, 'La calificacion ha sido actualizada', "ACTUALIZADA");
                // MODIFICACIONES-----------------------------------------------------------
              }
            }).catch((error) => {
            if (error?.response?.status == 422) {
                this.alertGuardado(grad.graper_id, error?.response?.data[0]?.message, "Error");
            }
        });
    }
} catch (e) {
    console.log(e);
}
}

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.grad.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(ID: String, msg = "", subMsg = "") {
    const alert = await this.alert.create({
      header: 'Calificación asignada', //Titulo de nuestra alerta
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
        const control = this.grad.get(String(key));
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
