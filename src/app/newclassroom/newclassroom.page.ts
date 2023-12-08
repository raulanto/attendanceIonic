import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController,
        ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-newclassroom',
  templateUrl: './newclassroom.page.html',
  styleUrls: ['./newclassroom.page.scss'],
})

export class NewclassroomPage implements OnInit {

  //PARA EL PUT
  @Input() classroomid: any | undefined;
  private editarDatos = []; // Arreglo para almacenar datos de edición si es necesario
  //

  baseUrl: string = "http://attendance.test/classroom";

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
    this.formulario(); // Inicializar el formulario al cargar la página
    if (this.classroomid !== undefined) {
      this.getDetalles();
    }
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
      if (this.classroomid === undefined) {
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
      } else {
        const response = await axios({
          method: 'put',
          url: this.baseUrl + '/' + this.classroomid,
          data: clase,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.clas_name, 'El salon ' + response.data.clas_name + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(clase.clas_name, error?.response?.data[0]?.message, "Error");
          }
        });
      }
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

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.classroomid,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.clase.get(String(key));
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
