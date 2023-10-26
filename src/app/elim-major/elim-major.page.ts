import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MajorPageModule } from '../major/major.module';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import {FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-elim-major',
  templateUrl: './elim-major.page.html',
  styleUrls: ['./elim-major.page.scss'],
})
export class ElimMajorPage  {

  items: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alert : AlertController,
    private formBuilder : FormBuilder,
    private router: Router
    
  ) { }


  ngOnInit() {
    this.loadMajors();
  }

  baseUrl:string = "http://attendanceproyect.atwebpages.com/"
  majorUrl:string = "http://attendanceproyect.atwebpages.com/major"
  major: any = [];
  public eliminarCarrera!: FormGroup;


  async loadMajors(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://attendanceproyect.atwebpages.com/major",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.major = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async alertEliminar(Carrera: any) {
    const alert = await this.alert.create({
    header: 'Alumno',
    subHeader: 'Eliminar',
    message: '¿Estás seguro de eliminar al estudiante con matrícula ' + Carrera + '?',
    cssClass: 'alert-center',
    buttons: [
        {
        text: 'Cancelar',
        role: 'cancel'
        },
        {
        text: 'Confirmar',
        role: 'confirm',
        handler: () => {
            this.guardarDatos();
        }
        }
    ]
    });
    await alert.present();
}



  async guardarDatos() {
    try {
      const eliminar = this.eliminarCarrera?.value; 
      const response = await axios({
        method: 'delete',
        url : this.majorUrl,
        data: eliminar, 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
      }).then((response) => {
        if (response?.status == 201) {
          this.alertEliminado(response.data.maj_id, 'La Carrera con el id ' + response.data.maj_id + ' ha sido eliminada');
        }
      }).catch((error) => {
        if (error?.response?.status == 422) {
          this.alertEliminado(eliminar.maj_id, error?.response?.data[0]?.message, "Error");
        }    
      });
    } catch (e) {
      console.log(e);
    }
  }

  async alertEliminado(maj_id: String, msg = "",  subMsg= "eliminado") {
    const alert = await this.alert.create({
    header: 'Carrera',
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
            this.regresar();
        },
        },
    ],
    });

    await alert.present();
  }

  private regresar() {
    this.router.navigate(['/major/major']).then(() => {
    window.location.reload();
    });
}




}
