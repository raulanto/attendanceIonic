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
  selectedMajor: any;
  constructor(
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alert : AlertController,
    private formBuilder : FormBuilder,
    private router: Router
    
  ) { }


  ngOnInit() {
    this.loadMajor();
  }

  baseUrl:string = "http://attendancedb.test/major"
  majorUrl:string = "http://attendanceproyect.atwebpages.com/major"
  majors: any = [];
  public eliminarCarrera!: FormGroup;

  


  async loadMajor(event?: InfiniteScrollCustomEvent) {
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
      this.majors = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmSelection() {
    if (this.selectedMajor) {
      // Realizar alguna acción si es necesario antes de asignar el valor
      // Por ejemplo, mostrar un cuadro de diálogo de confirmación.
      this.alertEliminar(this.selectedMajor);
    }
  }

  


  async alertEliminar(selectedMajor: any) {
    const alert = await this.alert.create({
      header: 'Alumno',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la carrera ' + selectedMajor + '?',
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
            this.selectedMajor = selectedMajor;
            this.guardarDatos();
          }
        }
      ]
    });
    await alert.present();
  }
  
//link base de datos local
//"http://attendancedb.test/major"

//link base de datos en linea
//"http://attendanceproyect.atwebpages.com/major"


async guardarDatos() {
  try {
    if (this.selectedMajor) {
      const eliminar = { maj_id: this.selectedMajor }; // Crea un objeto con la carrera a eliminar
      const response = await axios({
        method: 'delete',
        url: this.baseUrl + "/" + this.selectedMajor,
        withCredentials: true,
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
    } else {
      // Mostrar un mensaje de error si no se ha seleccionado una carrera
      this.alertEliminado("", "No has seleccionado una carrera para eliminar", "Error");
    }
  } catch (e) {
    console.log(e);
  }
}

  async alertEliminado(selectedMajor: any, msg = "",  subMsg= "eliminado") {
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

handleMajorSelection(event: any) {
  // Aquí puedes acceder al valor seleccionado con this.selectedMajor
  console.log("Carrera seleccionada:", this.selectedMajor);
}





}
