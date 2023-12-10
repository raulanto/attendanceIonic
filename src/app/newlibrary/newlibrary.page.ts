import { Component, OnInit, Input } from '@angular/core';
import { AlertController,
      ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-newlibrary',
  templateUrl: './newlibrary.page.html',
  styleUrls: ['./newlibrary.page.scss'],
})

export class NewlibraryPage implements OnInit {

  //PARA EL PUT
  @Input() libraryid: any | undefined;
  private editarDatos = []; // Arreglo para almacenar datos de edición si es necesario
  //
  
  groupID: any; // Recibir el ID del grupo como un parámetro

  baseUrl: string = "http://attendance.test/library";

  public libro!: FormGroup; //Sirve para ingresar datos de "libros"

  archivos:any = [];

  tiposArchivo = [
    { 'lib_type': 'Libro', 'typ_type': 'Libro' },
    { 'lib_type': 'Artículo', 'typ_type': 'Artículo' },
    { 'lib_type': 'Video', 'typ_type': 'Video' },
    { 'lib_type': 'Página web', 'typ_type': 'Página web' },
  ];

  // Mensajes de validación para campos del formulario
  mensajes_validacion: any = {
    'lib_type': [{ type: 'required', message: 'Formato requerido.' }],
    'lib_title': [{ type: 'required', message: 'Título requerido.' }],
    'lib_description': [{ type: 'required', message: 'Descripción requerida.' }],
    'lib_file': [{ type: 'required', message: 'Url requerida.' }],
    'lib_fkgroup': [{ type: 'required', message: 'Grupo requerido.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.formulario(); // Inicializar el formulario al cargar la página
    if (this.libraryid !== undefined) {
      this.getDetalles();
    }
    if (this.groupID) {
      // Hacer lo que necesites con this.groupID, por ejemplo, asignarlo a un campo del formulario.
      this.libro.patchValue({ lib_fkgroup: this.groupID });
    } 
  }
  
  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.libro = this.formBuilder.group({
      lib_type: ['', [Validators.required]],
      lib_title: ['', [Validators.required]],
      lib_description: ['', [Validators.required]],
      lib_file: ['', [Validators.required]],
      lib_fkgroup: ['', [Validators.required]],
    });
  }

  async guardarDatos() {
    try {
      const libro = this.libro?.value; //Obtener los valores del formulario
      if (this.libraryid === undefined) {
        const response = await axios.post('http://attendance.test/library/crear',libro, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token',
          }
        }).then( (response) => {//Llama la alerta en caso de exito
          if(response?.status == 200) {
            this.alertGuardado(libro.lib_title, 'El archivo ' + libro.lib_title + ' ha sido registrado');
          }
        }).catch( (error) => {
          if(error?.response?.status == 422) {
            this.alertGuardado(libro.lib_title, error?.response?.data[0]?.message, "Error");
          }     
        });
      } else {
        const response = await axios.put('http://attendance.test/library/modificar'+ '/' + this.libraryid,libro, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
        }).then((response) => {
          if (response?.status == 200) {
            this.alertGuardado(libro.lib_title, 'El archivo ' + libro.lib_title + ' ha sido actualizado');
          }
        }).catch((error) => {
          if (error?.response?.status == 422) {
            this.alertGuardado(libro.lib_title, error?.response?.data[0]?.message, "Error");
          }
        });
      }
    } catch(e){
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.libro.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  //método para reutilizar un alert
  private async alertGuardado(ID: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Archivo', //Titulo de nuestra alerta
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
      url: this.baseUrl + "/" + this.libraryid,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.libro.get(String(key));
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