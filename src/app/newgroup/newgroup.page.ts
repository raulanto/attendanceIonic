import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController,
        ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.page.html',
  styleUrls: ['./newgroup.page.scss'],
})

export class NewgroupPage implements OnInit {

  //PARA EL PUT
  @Input() groupid: any | undefined;
  private editarDatos = []; // Arreglo para almacenar datos de edición si es necesario
  //

  baseUrl: string = "http://attendance.test/group";
  materiaUrl:string = "http://attendance.test/subject/"
  docenteUrl:string = "http://attendance.test/teacher/"
  claseUrl:string = "http://attendance.test/classroom/"

  public grupo!: FormGroup; //Sirve para ingresar datos de "grupos"

  materias:any = [];
  docentes:any = [];
  clases:any = [];

  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'gro_code': [{ type: 'required', message: 'Codigo requerido.' }],
    'gro_fksubject': [{ type: 'required', message: 'Materia requerida.' }],
    'gro_fkteacher': [{ type: 'required', message: 'Profesor requerido.' }],
    'gro_fkclassroom': [{ type: 'required', message: 'Ubicación requerida.' }],
    'gro_date': [{ type: 'required', message: 'Fecha requerida.' }],
    'gro_time': [{ type: 'required', message: 'Hora requerida.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.formulario();// Inicializar el formulario al cargar pagina
    this.cargarMaterias();
    this.cargarDocentes();
    this.cargarSalones();
    if (this.groupid !== undefined) {
      this.getDetalles();
    }
  }

  async cargarMaterias() {
    const response = await axios({
      method: 'get',
      url : this.materiaUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
      }).then( (response) => {
        this.materias = response.data;
      }).catch(function (error) {
        console.log(error);     
    });
  }

  async cargarDocentes() {
    const response = await axios({
      method: 'get',
      url : this.docenteUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
      }).then( (response) => {
        this.docentes = response.data;
      }).catch(function (error) {
        console.log(error);     
    });
  }

  async cargarSalones() {
    const response = await axios({
      method: 'get',
      url : this.claseUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
      }).then( (response) => {
        this.clases = response.data;
      }).catch(function (error) {
        console.log(error);     
    });
  }

  private formulario() {
    // Expresión regular para verificar el formato para los codigos
    const codFormatRegex = /^[a-zA-Z0-9]{10}$/;
    // Expresión regular para verificar el formato "yyyy-MM-dd"
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    // Expresión regular para verificar el formato "hh:mm:ss" en un rango de 0 a 24 horas
    const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    
  
    // Crear el formulario reactivo con campos y validaciones
    this.grupo = this.formBuilder.group({
      gro_code: ['', [Validators.required, Validators.pattern(codFormatRegex)]],
      gro_fksubject: ['', [Validators.required]],
      gro_fkteacher: ['', [Validators.required]],
      gro_fkclassroom: ['', [Validators.required]],
      gro_date: ['', [Validators.required, Validators.pattern(dateFormatRegex)]],
      gro_time: ['', [Validators.required, Validators.pattern(timeFormatRegex)]],
    });
  }

  async guardarDatos() {
    try {
      const grupo = this.grupo?.value; //Obtener los valores del formulario
      if (this.groupid === undefined) {
        const response = await axios({
          method: 'post',
          url: this.baseUrl,
          data: grupo, // Datos del grupo para enviar al servidor
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token',
          }
        }).then( (response) => {//Llama la alerta en caso de exito
          if(response?.status == 201) {
            this.alertGuardado(response.data.gro_code, 'El grupo ' + response.data.gro_code + ' ha sido registrado');
          }
        }).catch( (error) => {
          if(error?.response?.status == 422) {
            this.alertGuardado(grupo.gro_code, error?.response?.data[0]?.message, "Error");
          }     
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.baseUrl + '/' + this.groupid,
          data: grupo,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.gro_code, 'El grupo ' + response.data.gro_code + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(grupo.gro_code, error?.response?.data[0]?.message, "Error");
          }
        });
      }
    } catch(e){
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.grupo.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(ID: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Grupo', //Titulo de nuestra alerta
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
      url: this.baseUrl + "/" + this.groupid,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.grupo.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
      }).catch(function (error) {
        console.log(error);
    });
  }
  
}

