import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-newclassroom',
  templateUrl: './newclassroom.page.html',
  styleUrls: ['./newclassroom.page.scss'],
})
export class NewclassroomPage implements OnInit {

  baseUrl: string = "http://attendancedb.test/classroom";

  public clase!: FormGroup; //Sirve para ingresar datos de "salones"

  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'clas_name': [{ type: 'required', message: 'Nombre requerido.' }],
    'clas_description': [{ type: 'required', message: 'Descripción requerida.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.formulario();// Inicializar el formulario al cargar pagina
  }

  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.clase = this.formBuilder.group({
      clas_name: ['', [Validators.required]],
      clas_description: ['', [Validators.required]],
    });
  }

  async guardarDatos() {
    try {
      const clase = this.clase?.value; //Obtener los valores del formulario
      const response = await axios({
        method: 'post',
        url: this.baseUrl,
        data: clase, // Datos del libro para enviar al servidor
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token',
        }
      }).then( (response) => {//Llama la alerta en caso de exito
        if(response?.status == 201) {
        this.alertGuardado(response.data.clas_name, 'El salon ' + response.data.clas_name + ' ha sido registrado');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
        this.alertGuardado(clase.clas_name, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
    console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.clase.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(ID: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Salon', //Titulo de nuestra alerta
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