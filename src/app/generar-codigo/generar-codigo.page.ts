import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodigoService } from './CodigoService ';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-generar-codigo',
  templateUrl: './generar-codigo.page.html',
  styleUrls: ['./generar-codigo.page.scss'],
})
export class GenerarCodigoPage implements OnInit {

  public grupoid: any;
  public nuevoCodigo: any;
  
  baseUrl: string = "http://attendancedb.test/code";

  public codigo!: FormGroup; //Sirve para ingresar datos de "codigos"

  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'cod_code': [{ type: 'required', message: 'Codigo' }],
    'cod_fkgroup': [{ type: 'required', message: 'Grupo requerida.' }],
    'cod_time': [{ type: 'required', message: 'Tiempo requerido.' }],
    'cod_date': [{ type: 'required', message: 'Fecha requerida.' }],
    'cod_duration': [{ type: 'required', message: 'Duracion requerida.' }],
  };

  constructor(
    private route: ActivatedRoute,
    private codigoService: CodigoService,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
    ) {
    // Acceder al valor de 'grupoid' y asignarlo a la propiedad de clase 'grupoid'
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
    this.nuevoCodigo = this.codigoService.generarCodigo();
  }

  
  ngOnInit() {
    this.mostrar();
    this.formulario();// Inicializar el formulario al cargar pagina
  }


  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.codigo = this.formBuilder.group({
      cod_code: ['', [Validators.required]],
      cod_fkgroup: ['', [Validators.required]],
      cod_time: ['', [Validators.required]],
      cod_date: ['', [Validators.required]],
      cod_duration: ['', [Validators.required]],
    });
  }


  async guardarDatos() {
    try {
      const codigo = this.codigo?.value; //Obtener los valores del formulario
      const response = await axios({
        method: 'post',
        url: this.baseUrl,
        data: codigo, // Datos del codigo para enviar al servidor
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token',
        }
      }).then( (response) => {//Llama la alerta en caso de exito
        if(response?.status == 201) {
        this.alertGuardado(response.data.lib_title, 'El archivo ' + response.data.lib_title + ' ha sido registrado');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
        this.alertGuardado(codigo.lib_title, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
    console.log(e);
    }
  }
  // Una función que utiliza el valor de 'grupoid'
  mostrar() {
    console.log('Valor de grupoid en generar codigo:', this.grupoid);
    console.log(this.nuevoCodigo);
    
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.codigo.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(ID: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Recurso', //Titulo de nuestra alerta
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
