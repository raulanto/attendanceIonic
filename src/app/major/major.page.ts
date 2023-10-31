import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewmajorPage } from '../newmajor/newmajor.page';
import { ElimMajorPage } from '../elim-major/elim-major.page';
import { UpMajorPage } from '../up-major/up-major.page';

@Component({
  selector: 'app-major',
  templateUrl: './major.page.html',
  styleUrls: ['./major.page.scss'],
})
export class MajorPage {

  items: any = [];
  selectedMajor: any;
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router, private navCtrl: NavController,
    public modalCtrl: ModalController,
    private alert : AlertController,
    private alertCtrl: AlertController,
    
  ) { }

  public alertButtons = ['Crear'];
  public alertInputs = [
    {
      placeholder: 'Nombre de la Carrera',
      attributes: {
        maxlength: 60,
      },
    },
    {
      placeholder: 'Codigo de la Carrera',
      attributes: {
        maxlength: 15,
      },
    },
    
  ];

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Registro Nueva Carrera',
      inputs: this.alertInputs,
      buttons: [
        {
          text: this.alertButtons[0],
          handler: (data) => {
            // Manejar los datos ingresados en el formulario aquí
            console.log('Datos del formulario:', data);
          },
        }, 
      ],
    });

    await alert.present();
  }


  majors: any = [];
  majorUrl:string = "http://attendanceproyect.atwebpages.com/major"
  baseUrl:string = "http://attendancedb.test/major"

  ngOnInit() {
    this.loadMajor();
  }
 
  //Metodo GET comienza

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

  //Metodo Eliminar comienza

  seleccionarMajor(majorName: string) {
    this.selectedMajor = majorName;
    this.alertEliminar(majorName);
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
        url: this.majorUrl + "s/" + this.selectedMajor,
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
        if (error?.response?.status == 500) {
          this.alertEliminado(eliminar.maj_id, error?.response?.data[0]?.message,"Este elemento no puede ser borrado porque entra en conflicto con un elemento externo");
        }
        if (error?.response?.status == 404) {
          this.alertEliminado(eliminar.maj_id, error?.response?.data[0]?.message,"Este elemento no ha sido encontrado");
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



  async newMajor() {
    const paginaModal = await this.modalCtrl.create({
    component: NewmajorPage,
    breakpoints : [0, 0.3, 0.5, 0.95],
    initialBreakpoint: 0.95
    });
    await paginaModal.present();
}

async elimMajor() {
  const paginaModal = await this.modalCtrl.create({
  component: ElimMajorPage,
  breakpoints : [0, 0.3, 0.5, 0.95],
  initialBreakpoint: 0.95
  });
  await paginaModal.present();
}



//Metodo Actualizar comienza

async UpMajor(selectedMajor:any) {

  const paginaModal = await this.modalCtrl.create({
  component: UpMajorPage,
  componentProps: {
      'careraEdit': selectedMajor
  },
  breakpoints: [0, 0.3, 0.5, 0.95],
  initialBreakpoint: 0.95
  });
  await paginaModal.present();

  paginaModal.onDidDismiss().then((data) => {
      this.loadMajor();
  });
}


}
