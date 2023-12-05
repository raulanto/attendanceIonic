import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-newextracurricular',
  templateUrl: './newextracurricular.page.html',
  styleUrls: ['./newextracurricular.page.scss'],
})
export class NewextracurricularPage implements OnInit {

  // MODIFICACIONES-----------------------------------------------------------
  baseUrl: string = "http://attendancedb.test/extra-group";
  extraUrl: string = "http://attendancedb.test/extracurricular";
  groupUrl: string = "http://attendancedb.test/group";
  // MODIFICACIONES-----------------------------------------------------------

  @Input() idextra: any | undefined;

  // MODIFICACIONES-----------------------------------------------------------
  @Input() title: string = '';
  // MODIFICACIONES-----------------------------------------------------------

  private editarDatos = [];

  public extracur!: FormGroup; //Sirve para ingresar datos de "libros"

  // MODIFICACIONES-----------------------------------------------------------
  eventos: any = [];
  // MODIFICACIONES-----------------------------------------------------------

  // MODIFICACIONES-----------------------------------------------------------
  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'extgro_fkextracurricular': [{ type: 'required', message: 'Nombre del evento requerido' }],
    'extgro_fkgroup': [{ type: 'required', message: 'Grupo requerido' }],
    'extgro_commit': [{ type: 'required', message: 'Comentario requerido' }],
  };
  // MODIFICACIONES-----------------------------------------------------------

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    // MODIFICACIONES-----------------------------------------------------------
    this.cargarEventos();
    // MODIFICACIONES-----------------------------------------------------------
    this.formulario();
    if (this.idextra !== undefined) {
      this.getDetalles();
    }
  }

  // MODIFICACIONES-----------------------------------------------------------
  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.extracur = this.formBuilder.group({
      extgro_fkextracurricular: ['', [Validators.required]],
      extgro_fkgroup: ['', [Validators.required]],
      extgro_commit: ['', [Validators.required]],
    });
    // MODIFICACIONES-----------------------------------------------------------
  }

  async guardarDatos() {
    try {
      const extracur = this.extracur?.value; //Obtener los valores del formulario


      if (this.idextra === undefined) {
        const response = await axios({
          method: 'post',
          url: this.baseUrl,
          data: extracur, // Datos del libro para enviar al servidor
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token',
          }
        }).then((response) => {//Llama la alerta en caso de exito
          if (response?.status == 201) {
            // MODIFICACIONES-----------------------------------------------------------
            this.alertGuardado(response.data.extgro_id, 'El evento ' + response.data.extgro_id + ' ha sido registrado');
            // MODIFICACIONES-----------------------------------------------------------
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            // MODIFICACIONES-----------------------------------------------------------
            this.alertGuardado(extracur.extgro_id, error?.response?.data[0]?.message, "Error");
            // MODIFICACIONES-----------------------------------------------------------
          }
        });
      } else {
        const response = await axios({
        method: 'put',
        url: this.baseUrl + '/' + this.idextra,
        data: extracur,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
        }
        }).then((response) => {
            if (response?.status == 200) {
              // MODIFICACIONES-----------------------------------------------------------
                this.alertGuardado(response.data.extgro_id, 'El evento ' + response.data.extgro_id + ' ha sido actualizado');
                // MODIFICACIONES-----------------------------------------------------------
              }
            }).catch((error) => {
            if (error?.response?.status == 422) {
                this.alertGuardado(extracur.extgro_id, error?.response?.data[0]?.message, "Error");
            }
        });
    }
} catch (e) {
    console.log(e);
}
}

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.extracur.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(ID: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Evento', //Titulo de nuestra alerta
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
      url: this.baseUrl + "/" + this.idextra,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.extracur.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(function (error) {
      console.log(error);
    });
  }

  // MODIFICACIONES-----------------------------------------------------------
  async cargarEventos() {
    const response = await axios({
    method: 'get',
    url : this.extraUrl,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
    }).then( (response) => {
    this.eventos = response.data;
    }).catch(function (error) {
    console.log(error);     
    });
}

}
// MODIFICACIONES-----------------------------------------------------------