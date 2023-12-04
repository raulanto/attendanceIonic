import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsubject',
  templateUrl: './newsubject.page.html',
  styleUrls: ['./newsubject.page.scss'],
})
export class NewSubjectPage {

  baseUrl:string = 'http://attendancedb.test/subject'

  public materia!: FormGroup;

  mensajes_validacion:any = {
    'sub_name' : [
        {type : 'required' , message : 'Titulo Requerido.'},
    ],
    'sub_code' : [
        {type : 'required' , message : 'Codigo requerido.'},
    ],

    
  }

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController,
    private router: Router, private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.formulario();
  }

  public formulario() {
    this.materia = this.formBuilder.group({
    sub_name: ['', [Validators.required]],
    sub_code: ['',[Validators.required]],
 
    })
  }

  
  async guardarDatos() {
    try {
      const agregar = this.materia?.value; 
      const response = await axios({
        method: 'post',
        url : this.baseUrl,
        data: agregar, 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token'
        }
      }).then((response) => {
        if (response?.status == 201) {
          this.alertGuardado(response.data.sub_id, 'La Materia con el id ' + response.data.sub_id + ' ha sido registrada');
        }
      }).catch((error) => {
        if (error?.response?.status == 422) {
          this.alertGuardado(agregar.sub_id, error?.response?.data[0]?.message, "Error");
        }    
      });
    } catch (e) {
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.materia.get(controlName);
    if (control?.touched && control?.errors != null) {
    errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(matricula: String, msg = "",  subMsg= "Guardado") {
    const alert = await this.alert.create({
    header: 'Recurso',
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
            this.regresar();
        },
        },
    ],
    });

    await alert.present();
  }

  public regresar() {
    // Navega a la página "subject.page"
    this.router.navigate(['../subject/subject.page']).then(() => {
      // Recarga la página "subject.page"
      location.reload();
    });
  }

}

