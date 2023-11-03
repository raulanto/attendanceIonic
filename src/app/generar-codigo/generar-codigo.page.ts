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
  public time:any;
  
  baseUrl: string = "http://attendancedb.test/code/";

  public codigo!: FormGroup; //Sirve para ingresar datos de "codigos"

  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
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
   obtenerHoraActual() {
    const fechaActual = new Date();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
    
    // Formatea la hora, minutos y segundos como deseas
    const horaActual = `${hora}:${minutos}:${segundos}`;
    return horaActual;
    
  }

  


  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.codigo = this.formBuilder.group({
      cod_date: ['', [Validators.required]],
      cod_duration: ['', [Validators.required]],
    });
  }


  async guardarDatos() {
    try {
      let codigo = this.codigo?.value; //Obtener los valores del formulario
      codigo.cod_fkgroup=this.grupoid;
      codigo.cod_time=this.obtenerHoraActual();
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
        this.alertGuardado(response.data.cod_code, 'El archivo ' + response.data.cod_code + ' ha sido registrado');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
        this.alertGuardado(codigo.cod_code, error?.response?.data[0]?.message, "Error");
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
