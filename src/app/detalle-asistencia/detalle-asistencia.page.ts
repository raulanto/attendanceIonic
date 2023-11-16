import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController, AlertController ,ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {
  [x: string]: any;
  public idperson: any;
  public baseUrl: string = 'http://attendancedb.test/attendance';
  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private toastController:ToastController,
    private alertController: AlertController
  ) {
    //mandamos a pedir el id del grupo desde route paramMap
    this.idperson = this.route.snapshot.paramMap.get('idperson');
  }

  ngOnInit() {
    this.mostrar();
    this.cargarAsistencia();

  }

  // Una función que utiliza el valor de 'idperson'
  mostrar() {
    console.log('Valor de idperson en asistencia:', this.idperson);
  }

  asistencias: any = [];

  async cargarAsistencia(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://attendancedb.test/attendance/asistencias?id=" + this.idperson,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        //token Bearer 100-token
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.asistencias = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  //Borrar 


  async alertEliminar(person: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alumno',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar al estudiante con matrícula ' + person + '?',
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
            this.eliminar(person);
          }
        }
      ]
    });
    await alert.present();
  }
  async eliminar(person: any) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + 's/' + person,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado( 'El alumno con id ' + person + ' ha sido eliminado');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  async alertEliminado( msg = "") {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
    this.regresar();
  }
  private regresar() {
    this.router.navigate(['/tabs/detalle-asistencia',this.idperson]).then(() => {
      window.location.reload();
    });
  }


  // cambiar los tipos any por los modelos
  async showDataAlert(asistencia: any) {
		const alert = await this.alertController.create({
			header: 'Datos',
			subHeader: 'Asistencia',
			message: `
			Code: ${asistencia.att_fkcode}<br>
			Fecha: ${asistencia.att_date}<br>`,
			buttons: ['OK']
		});

		await alert.present();
	}


}
