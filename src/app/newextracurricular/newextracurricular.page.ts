import { Component, OnInit } from '@angular/core';
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
  
  baseUrl: string = "http://attendancedb.test/extracurricular";
  
  public extracur!: FormGroup; //Sirve para ingresar datos de "libros"
  
  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'ext_name': [{ type: 'required', message: 'Nombre requerido.' }],
    'ext_date': [{ type: 'required', message: 'Fecha requerido.' }],
    'ext_opening': [{ type: 'required', message: 'Hora de inicio requerida.' }],
    'ext_closing': [{ type: 'required', message: 'Hora de cierre requerida.' }],
    'ext_description': [{ type: 'required', message: 'Descripcion requerida.' }],
    'ext_place': [{ type: 'required', message: 'Lugar requerido.' }],
    'ext_code': [{ type: 'required', message: 'Codigo requerido.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.formulario();
  }

  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.extracur = this.formBuilder.group({
      ext_name: ['', [Validators.required]],
      ext_date: ['', [Validators.required]],
      ext_opening: ['', [Validators.required]],
      ext_closing: ['', [Validators.required]],
      ext_description: ['', [Validators.required]],
      ext_place: ['', [Validators.required]],
      ext_code: ['', [Validators.required]],
    });
  }

  async guardarDatos() {
    try {
      const extracur = this.extracur?.value; //Obtener los valores del formulario
      const response = await axios({
        method: 'post',
        url: this.baseUrl,
        data: extracur, // Datos del libro para enviar al servidor
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token',
        }
      }).then( (response) => {//Llama la alerta en caso de exito
        if(response?.status == 201) {
        this.alertGuardado(response.data.ext_code, 'El evento ' + response.data.ext_code + ' ha sido registrado');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
        this.alertGuardado(extracur.ext_code, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
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

}
