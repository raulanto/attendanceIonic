import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MajorPageModule } from '../major/major.module';


@Component({
  selector: 'app-up-major',
  templateUrl: './up-major.page.html',
  styleUrls: ['./up-major.page.scss'],
})
export class UpMajorPage {

  @Input() selectedMajor: any | undefined;
  

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router, private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private alert : AlertController,
  ) { }

  majorUrl: string = "http://attendancedb.test/major"
  majors: any = [];
  private editarDatos = [];
  public editCarrera!: FormGroup;

  mensajes_validacion:any = {
    'maj_name' : [
        {type : 'required' , message : 'Titulo Requerido.'},
    ],
    'maj_code' : [
        {type : 'required' , message : 'Codigo requerido.'},
    ],

    
  }

  ngOnInit() {

    this.loadMajor();
    this.getDetalles();
    this.formulario();


  }

  async loadMajor(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://attendancedb.test/major",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.majors = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  private formulario() {
    this.editCarrera = this.formBuilder.group({

      maj_name: ['', [Validators.required]],
      maj_code: ['', [Validators.required]],


    });
    /*if (this.selectedMajor !== undefined) {
      this.editCarrera.get('maj_name')?.disable();
    }*/
  }

  async guardarDatos() {
    try {
      const editar = this.editCarrera?.value;
      if (this.selectedMajor === undefined) {
         // Crea un objeto con la carrera a editar
        const response = await axios({
          method: 'post',
          url: this.majorUrl + "/" + this.selectedMajor,
          withCredentials: true,
          data: editar,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 201) {
            this.alertGuardado(response.data.maj_id, 'La Carrera con el id ' + response.data.maj_id + ' ha sido modificada');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(editar.maj_id, error?.response?.data[0]?.message, "Error");
          }
          if (error?.response?.status == 500) {
            this.alertGuardado(editar.maj_id, error?.response?.data[0]?.message,"Este elemento no puede ser editado porque entra en conflicto con un elemento externo");
          }
          if (error?.response?.status == 404) {
            this.alertGuardado(editar.maj_id, error?.response?.data[0]?.message,"Este elemento no ha sido encontrado");
          }
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.majorUrl + '/' + this.selectedMajor,
          data: editar,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 100-token'
          }
          }).then((response) => {
              if (response?.status == 200) {
                  this.alertGuardado(response.data.maj_id, 'La carrera con el id ' + response.data.maj_id + ' ha sido actualizada');
              }
              }).catch((error) => {
              if (error?.response?.status == 422) {
                  this.alertGuardado(this.selectedMajor, error?.response?.data[0]?.message, "Error");
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
          this.regresar();

        },
        },
    ],
    });

    await alert.present();
  }

  async getDetalles() {
    const response = await axios({
    method: 'get',
    url: this.majorUrl + "/" + this.selectedMajor,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
    }).then((response) => {
        this.editarDatos = response.data;
        Object.keys(this.editarDatos).forEach((key: any) => {
            const control = this.editCarrera.get(String(key));
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
  const control = this.editCarrera.get(controlName);
  if (control?.touched && control?.errors != null) {
  errors = JSON.parse(JSON.stringify(control?.errors));
  }
  return errors;
}

private regresar() {
  // Navega a la página "subject.page"
  this.router.navigate(['../major/major.page']).then(() => {
    // Recarga la página "subject.page"
    location.reload();
  });
}


}


