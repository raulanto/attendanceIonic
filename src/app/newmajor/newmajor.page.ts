import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import axios from 'axios';


@Component({
  selector: 'app-newmajor',
  templateUrl: './newmajor.page.html',
  styleUrls: ['./newmajor.page.scss'],
})
export class NewmajorPage {

  baseUrl: string = "http://attendanceproyect.atwebpages.com/majors"

  @Input() selectedMajor: any | undefined;
  public libro!: FormGroup;

  mensajes_validacion: any = {
    'maj_name': [
      { type: 'required', message: 'Titulo Requerido.' },
    ],
    'maj_code': [
      { type: 'required', message: 'Codigo requerido.' },
    ],


  }

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    
    this.formulario();
  }

  public formulario() {
    this.libro = this.formBuilder.group({
      maj_name: ['', [Validators.required]],
      maj_code: ['', [Validators.required]],

    })
  }

  async guardarDatos() {
    try {
      const agregar = this.libro?.value;
      const response = await axios({
        method: 'post',
        url: this.baseUrl,
        data: agregar,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
      }).then((response) => {
        if (response?.status == 201) {
          this.alertGuardado(response.data.maj_id, 'La Carrera con el id ' + response.data.maj_id + ' ha sido registrada');
        }
      }).catch((error) => {
        if (error?.response?.status == 422) {
          this.alertGuardado(agregar.maj_id, error?.response?.data[0]?.message, "Error");
        }
      });
    } catch (e) {
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

  private async alertGuardado(matricula: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Recurso',
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
