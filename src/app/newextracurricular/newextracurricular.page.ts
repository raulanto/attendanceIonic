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
    'ext_date': [
      { type: 'required', message: 'Fecha requerida.' },
      { type: 'pattern', message: 'Fecha en formato YYYY-MM-DD.' },
    ],
    'ext_opening': [
      { type: 'required', message: 'Hora de inicio requerida.' },
      { type: 'pattern', message: 'Hora en formato HH-MM-SS.' },
    ],
    'ext_closing': [
      { type: 'required', message: 'Hora de cierre requerida.' },
      { type: 'pattern', message: 'Hora en formato HH-MM-SS.' },
    ],
    'ext_description': [{ type: 'required', message: 'Descripcion requerida.' }],
    'ext_place': [{ type: 'required', message: 'Lugar requerido.' }],
    'ext_code': [
      { type: 'required', message: 'Codigo requerido.' },
      { type : 'maxLength', message : 'Codigo de no más de 10 caracteres.'},
    ],
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
      ext_date: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]{4}-[0-9]{2}-[0-9]{2}$")
      ])],
      ext_opening: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$")
      ])],
      ext_closing: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$")
      ])],
      ext_description: ['', [Validators.required]],
      ext_place: ['', [Validators.required]],
      ext_code: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.required,
      ])],
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
