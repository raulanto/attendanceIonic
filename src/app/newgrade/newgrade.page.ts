import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-newgrade',
  templateUrl: './newgrade.page.html',
  styleUrls: ['./newgrade.page.scss'],
})
export class NewgradePage implements OnInit {

  baseUrl: string = "http://attendancedb.test/grade";
  personaUrl: string = "http://attendancedb.test/person";

  public grad!: FormGroup;

  personas: any = [];

    // Mensajes de validación para campos del formulario
    mensajes_validacion: any = {
      'gra_type': [{ type: 'required', message: 'Tipo requerido.' }],
      'gra_date': [
        { type: 'required', message: 'Fecha requerida.' },
        { type: 'pattern', message: 'Fecha en formato YYYY-MM-DD.' },
      ],
      'gra_time': [
        { type: 'required', message: 'Hora requerida.' },
        { type: 'pattern', message: 'Hora en formato HH-MM-SS.' },
      ],

      'gra_score': [{ type: 'required', message: 'Calificación requerida.' }],
      'gra_commit': [{ type: 'required', message: 'Comentario requerido.' }],
      'gra_fkgroup': [{ type: 'required', message: 'Grupo requerido.' }],
      'gra_fkperson': [{ type: 'required', message: 'Alumno requerido.' }],
    };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cargarPersonas();
    this.formulario();
  }

  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.grad = this.formBuilder.group({
      gra_type: ['', [Validators.required]],
      gra_date: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]{4}-[0-9]{2}-[0-9]{2}$")
      ])],
      gra_time: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$")
      ])],

      gra_score: ['', [Validators.required]],
      gra_commit: ['', [Validators.required]],
      gra_fkgroup: ['', [Validators.required]],
      gra_fkperson: ['', [Validators.required]],
    });
  }

  async cargarPersonas() {
    const response = await axios({
    method: 'get',
    url : this.personaUrl,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
    }).then( (response) => {
    this.personas = response.data;
    }).catch(function (error) {
    console.log(error);     
    });
}


  async guardarDatos() {
    try {
      const grad = this.grad?.value; //Obtener los valores del formulario
      const { gra_type, gra_date, gra_time } = this.grad.value; // Guardar los valores de Tipo, Fecha y Hora
      const response = await axios({
        method: 'post',
        url: this.baseUrl,
        data: grad, // Datos del libro para enviar al servidor
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token',
        }
      }).then( (response) => {//Llama la alerta en caso de exito
        if(response?.status == 201) {
        this.alertGuardado('La calificación ha sido registrada');

        this.grad.reset(); // Reiniciar los valores del formulario
        this.grad.patchValue({ // Volver a asignar los valores guardados de Tipo, Fecha y Hora
          gra_type: gra_type,
          gra_date: gra_date,
          gra_time: gra_time
        });

        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
        this.alertGuardado(error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
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
    private async alertGuardado(msg = "", subMsg = "Guardado") {
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

}
