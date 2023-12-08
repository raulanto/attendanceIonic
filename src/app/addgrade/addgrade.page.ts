import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { ActivatedRoute, 
  Router } from '@angular/router'; 

@Component({
  selector: 'app-addgrade',
  templateUrl: './addgrade.page.html',
  styleUrls: ['./addgrade.page.scss'],
})
export class AddgradePage implements OnInit {

  baseUrl: string = "http://attendance.test/grade";
  baseUrl2: string = "http://attendance.test/grade-person";
  personaUrl: string = 'http://attendance.test/listg/listas?id=';

  public grad!: FormGroup; //Sirve para ingresar datos de "libros"

  personas: any = [];

  gradeId : any;

  grupoid: any;

  @Input() title: string = '';

  @Input() gid: any | undefined;

  mensajes_validacion: any = {
    'graper_fkperson': [{ type: 'required', message: 'Nombre del alumno requerido' }],
    'graper_fkgrade': [{ type: 'required', message: 'Asignación requerida' }],
    'graper_commit': [{ type: 'required', message: 'Comentario requerido' }],
    'graper_score': [{ type: 'required', message: 'Calificación requerida' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
  ) { 
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
  }

  mostrar() {
    console.log('Valor de grupoid en newgrades:', this.grupoid);
  }

  ngOnInit() {
    this.mostrar();
    this.cargarPersonas();
    // MODIFICACIONES-----------------------------------------------------------
    this.formulario();
    if (this.gid) {
      // Hacer lo que necesites con this.groupID, por ejemplo, asignarlo a un campo del formulario.
      this.grad.patchValue({ graper_fkgrade: this.gid });
    }
  }

  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.grad = this.formBuilder.group({
      graper_fkperson: ['', [Validators.required]],
      graper_fkgrade: ['', [Validators.required]],
      graper_commit: ['', [Validators.required]],
      graper_score: ['', [Validators.required]],
    });
    // MODIFICACIONES-----------------------------------------------------------
  }

  async cargarPersonas() {
    const response = await axios({
    method: 'get',
    url : this.personaUrl+this.grupoid,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
    }).then( (response) => {
    this.personas = response.data;
    }).catch(function (error) {
      // MODIFICACIONES-----------------------------------------------------------
    console.log(error);
    // MODIFICACIONES-----------------------------------------------------------
    });
}


  async guardarDatos() {
    try {
      const grad = this.grad?.value; //Obtener los valores del formulario
        const response = await axios({
          method: 'post',
          url: this.baseUrl2,
          data: grad, // Datos del libro para enviar al servidor
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token',
          }
        }).then((response) => {//Llama la alerta en caso de exito
          if (response?.status == 201) {

            // MODIFICACIONES-----------------------------------------------------------
            this.alertGuardado(response.data.graper_id, 'La calificación ha sido enviada', "ENVIADA");
            // MODIFICACIONES-----------------------------------------------------------
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            // MODIFICACIONES-----------------------------------------------------------
            this.alertGuardado(grad.graper_id, error?.response?.data[0]?.message, "Error");
            // MODIFICACIONES-----------------------------------------------------------
          }
        });
} catch (e) {
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
  private async alertGuardado(ID: String, msg = "", subMsg = "") {
    const alert = await this.alert.create({
      header: 'Calificación asignada', //Titulo de nuestra alerta
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