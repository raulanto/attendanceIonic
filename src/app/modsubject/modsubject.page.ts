import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modsubject',
  templateUrl: './modsubject.page.html',
  styleUrls: ['./modsubject.page.scss'],
})
export class ModsubjectPage implements OnInit {

  @Input() selectedSubject: any | undefined;

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router, private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private alert : AlertController,) { }

  baseUrl: string = 'http://attendancedb.test/subject';
  subjects: any = [];
  private editarDatos = [];
  public editMateria!: FormGroup;

  mensajes_validacion:any = {
    'sub_name' : [
        {type : 'required' , message : 'Titulo Requerido.'},
    ],
    'sub_code' : [
        {type : 'required' , message : 'Codigo requerido.'},
    ],

    
  }

  ngOnInit() {

    this.loadSubjects();
    this.getDetalles();
    this.formulario();
  }
  
  async loadSubjects(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: this.baseUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.subjects = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  private formulario() {
    this.editMateria = this.formBuilder.group({

      sub_name: ['', [Validators.required]],
      sub_code: ['', [Validators.required]],

    });
    /*if (this.selectedMajor !== undefined) {
      this.editCarrera.get('maj_name')?.disable();
    }*/
  }

  async guardarDatos() {
    try {
      const editar = this.editMateria?.value;
      if (this.selectedSubject === undefined) {
         // Crea un objeto con la carrera a editar
        const response = await axios({
          method: 'post',
          url: this.baseUrl + "/" + this.selectedSubject,
          withCredentials: true,
          data: editar,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(response.data.sub_id, 'La Carrera con el id ' + response.data.sub_id + ' ha sido modificada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(editar.sub_id, error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertGuardado(editar.sub_id, error?.response?.data[0]?.message,"Este elemento no puede ser editado porque entra en conflicto con un elemento externo");
          }
          if (error?.response?.status == 404) {
            this.alertGuardado(editar.sub_id, error?.response?.data[0]?.message,"Este elemento no ha sido encontrado");
          }
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.baseUrl + '/' + this.selectedSubject,
          data: editar,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 100-token'
          }
          }).then((response) => {
              if (response?.status == 200) {
                  this.alertGuardado(response.data.sub_id, 'La carrera con el id ' + response.data.sub_id + ' ha sido actualizada');
              }
              }).catch((error) => {
              if (error?.response?.status == 422) {
                  this.alertGuardado(this.selectedSubject, error?.response?.data[0]?.message, "Error");
              }
          });
      }
    } catch (e) {
      console.log(e);
    }
  }

  private async alertGuardado(matricula: String, msg = "",  subMsg= "Guardado") {
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

  async getDetalles() {
    const response = await axios({
    method: 'get',
    url: this.baseUrl + "/" + this.selectedSubject,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
    }).then((response) => {
        this.editarDatos = response.data;
        Object.keys(this.editarDatos).forEach((key: any) => {
            const control = this.editMateria.get(String(key));
            if (control !== null) {
                control.markAsTouched();
                control.patchValue(this.editarDatos[key]);
            }
        })
    }).catch(function (error) {
        console.log(error);
    });
}

public getError(controlName: string) {
  let errors: any[] = [];
  const control = this.editMateria.get(controlName);
  if (control?.touched && control?.errors != null) {
  errors = JSON.parse(JSON.stringify(control?.errors));
  }
  return errors;
}

}
