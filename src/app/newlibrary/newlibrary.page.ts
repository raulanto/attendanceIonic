import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';


@Component({
  selector: 'app-newlibrary',
  templateUrl: './newlibrary.page.html',
  styleUrls: ['./newlibrary.page.scss'],
})
export class NewlibraryPage implements OnInit {

  baseUrl: string = "http://attendancedb.test/library";

  public libro!: FormGroup; //Sirve para ingresar datos de "libros"

  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'lib_type': [{ type: 'required', message: 'Formato requerido.' }],
    'lib_title': [{ type: 'required', message: 'Título requerido.' }],
    'lib_description': [{ type: 'required', message: 'Descripción requerida.' }],
    'lib_file': [{ type: 'required', message: 'Url requerida.' }],
    'lib_fkgroup': [{ type: 'required', message: 'Grupo requerido.' }],
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
    this.libro = this.formBuilder.group({
      lib_type: ['', [Validators.required]],
      lib_title: ['', [Validators.required]],
      lib_description: ['', [Validators.required]],
      lib_file: ['', [Validators.required]],
      lib_fkgroup: ['', [Validators.required]],
    });
  }

  async guardarDatos() {
    try {
      const libro = this.libro?.value; //Obtener los valores del formulario
      const response = await axios({
        method: 'post',
        url: this.baseUrl,
        data: libro, // Datos del libro para enviar al servidor
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token',
        }
      }).then( (response) => {//Llama la alerta en caso de exito
        if(response?.status == 201) {
        this.alertGuardado(response.data.lib_title, 'El archivo ' + response.data.lib_title + ' ha sido registrado');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
        this.alertGuardado(libro.lib_title, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
    console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.libro.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(ID: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Archivo', //Titulo de nuestra alerta
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

