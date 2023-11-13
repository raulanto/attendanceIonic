import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-newlista',
  templateUrl: './newlista.page.html',
  styleUrls: ['./newlista.page.scss'],
})

export class NewlistaPage implements OnInit {
  
  //PARA EL PUT
  @Input() listgid: any | undefined;
  private editarDatos = []; // Arreglo para almacenar datos de edición si es necesario
  //

  groupID: any; // Recibir el ID del grupo como un parámetro

  baseUrl: string = "http://attendancedb.test/listg";
  alumnoUrl:string = "http://attendancedb.test/person/"

  public lista!: FormGroup; //Sirve para ingresar datos de "alumnos a un grupo"

  alumnos:any = [];

  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'list_fkgroup': [{ type: 'required', message: 'Grupo requerido' }],
    'list_fkperson': [{ type: 'required', message: 'Alumno requerido.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.formulario(); // Inicializar el formulario al cargar la página
    this.cargarAlumnos(); 
    if (this.listgid !== undefined) {
      this.getDetalles();
    }
    if (this.groupID) {
      // Hacer lo que necesites con this.groupID, por ejemplo, asignarlo a un campo del formulario.
      this.lista.patchValue({ lib_fkgroup: this.groupID });
    } 
  }

  async cargarAlumnos() {
    const response = await axios({
    method: 'get',
    url : this.alumnoUrl,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
    }).then( (response) => {
    this.alumnos = response.data;
    }).catch(function (error) {
    console.log(error);     
    });
  }

  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.lista = this.formBuilder.group({
      list_fkgroup: ['', [Validators.required]],
      list_fkperson: ['', [Validators.required]],
    });
  }

  async guardarDatos() {
    try {
      const lista = this.lista?.value; //Obtener los valores del formulario
      if (this.listgid === undefined) {
        const response = await axios({
          method: 'post',
          url: this.baseUrl,
          data: lista, // Datos del libro para enviar al servidor
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token',
          }
        }).then( (response) => {//Llama la alerta en caso de exito
          if(response?.status == 201) {
            this.alertGuardado(response.data.list_fkperson, 'El alumno ' + response.data.list_fkperson + ' ha sido registrado');
          }
        }).catch( (error) => {
          if(error?.response?.status == 422) {
            this.alertGuardado(lista.list_fkperson, error?.response?.data[0]?.message, "Error");
          }   
        });
      } else {
        const response = await axios({
          method: 'put',
          url: this.baseUrl + '/' + this.listgid,
          data: lista,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(response.data.list_fkperson, 'El alumno ' + response.data.list_fkperson + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(lista.list_fkperson, error?.response?.data[0]?.message, "Error");
          }
        });
      }
    } catch(e){
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.lista.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(ID: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Alumno', //Titulo de nuestra alerta
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
      url: this.baseUrl + "/" + this.listgid,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.lista.get(String(key));
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

