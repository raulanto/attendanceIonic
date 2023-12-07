import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

import { AlertController, IonicModule, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.page.html',
  styleUrls: ['./new-question.page.scss'],
})

export class NewQuestionPage implements OnInit {
  questionUrl: string = "http://attendance.test/question" 
  tagUrl: string = "http://attendance.test/tag/"
  @Input() id: number | undefined; //id traido desde el otro ts
  public question!: FormGroup; //aqui 
  tags: any = [];
  private editarDatos = [];

  mensajes_validacion: any = {
    'que_fktag': [
      { type: 'required', message: 'Tema requerido' },
    ],
    'que_title': [
      { type: 'required', message: 'Titulo requerido' },
    ],
    'que_description': [
      { type: 'required', message: 'Description requerida' },
    ],
    'que_fkperson': [
      { type: 'required', message: 'Description requerida' },
    ],
    'que_fkteacher': [
      { type: 'required', message: 'Description requerida' },
    ],
  }

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cargarTags();
    this.formulario();
    if (this.id !== undefined) {
      this.getDetalles();
    }
    
  
  }
  async cargarTags() {
    const response = await axios({
      method: 'get',
      url: this.tagUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.tags = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
  private formulario() {
    this.question = this.formBuilder.group({
      que_fktag: ['', [Validators.required]],
      que_title: ['', [Validators.required]],
      que_description: ['', [Validators.required]],
      que_fkperson: ['', [Validators.required]],
      que_fkteacher: ['', [Validators.required]],
    })
  }

  async guardarDatos() {
    try {
      let que = this.question?.value;
      if (this.question === undefined) {
        que.que_create = new Date().toISOString();
        que.que_status = 1;
        const response = await axios({
          method: 'post',
          url: this.questionUrl,
          data: que,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(response.data.que_title, 'Su pregunta sobre ' + response.data.que_title + ' ha sido registrada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(que.que_title, error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertGuardado(que.que_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
          }
        });
     } else {
        const response = await axios({
          
          method: 'put',
          url: this.questionUrl + '/' + this.id,
          data: que,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.que_title, 'Su pregunta sobre ' + response.data.que_title + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(que.que_id, error?.response?.data[0]?.message, "Error");
          }
        });
     }
    } catch (e) {
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.question.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(matricula: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Question',
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
      url: this.questionUrl + "/" + this.id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.question.get(String(key));
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



