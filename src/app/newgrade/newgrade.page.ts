import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { ActivatedRoute, 
  Router } from '@angular/router';  

@Component({
  selector: 'app-newgrade',
  templateUrl: './newgrade.page.html',
  styleUrls: ['./newgrade.page.scss'],
})
export class NewgradePage implements OnInit {

  // MODIFICACIONES-----------------------------------------------------------
  baseUrl: string = "http://attendance.test/grade/guardar";
  baseUrl2: string = "http://attendance.test/grade-person/guardar";
  personaUrl: string = 'http://attendance.test/listg/listas?id=';
  // MODIFICACIONES-----------------------------------------------------------

  public grad!: FormGroup;

  // MODIFICACIONES-----------------------------------------------------------
  public grad2!: FormGroup;

  personas: any = [];

  gradeId : any;

  public grupoid: any;
  // MODIFICACIONES-----------------------------------------------------------

    // Mensajes de validación para campos del formulario
    mensajes_validacion: any = {
      'gra_type': [{ type: 'required', message: 'Tipo requerido.' }],
      'gra_date': [
        { type: 'required', message: 'Fecha requerida.' },
        { type: 'pattern', message: 'Fecha en formato YYYY-MM-DD.' },
      ],
      'gra_time': [
        { type: 'required', message: 'Hora requerida.' },
        { type: 'pattern', message: 'Hora en formato HH-MM-SS.' },
      ],

      // MODIFICACIONES-----------------------------------------------------------
      'graper_score': [{ type: 'required', message: 'Calificación requerida.' }],
      'graper_commit': [{ type: 'required', message: 'Comentario requerido.' }],
      'gra_fkgroup': [{ type: 'required', message: 'Grupo requerido.' }],
      'graper_fkperson': [{ type: 'required', message: 'Alumno requerido.' }],
      'graper_fkgrade': [{ type: 'required', message: 'Grade requerido.' }],
      // MODIFICACIONES-----------------------------------------------------------
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
    this.formulario();
    // MODIFICACIONES-----------------------------------------------------------
    this.formulario2();
    // MODIFICACIONES-----------------------------------------------------------
    if (this.grupoid) {
      // Hacer lo que necesites con this.groupID, por ejemplo, asignarlo a un campo del formulario.
      this.grad.patchValue({ gra_fkgroup: this.grupoid });
    } 
  }

  private formulario() {
    // Crear el formulario reactivo con campos y validaciones
    this.grad = this.formBuilder.group({
      gra_type: ['', [Validators.required]],
      gra_date: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]{4}-[0-9]{2}-[0-9]{2}$")
      ])],
      gra_time: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$")
      ])],
      // MODIFICACIONES-----------------------------------------------------------
      // graper_score: ['', [Validators.required]],
      // graper_commit: ['', [Validators.required]],
      gra_fkgroup: ['', [Validators.required]],
      // graper_fkperson: ['', [Validators.required]],
      // graper_fkgrade: ['', [Validators.required]],
      // MODIFICACIONES-----------------------------------------------------------
    });
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
      // MODIFICACIONES-----------------------------------------------------------
      const grad = this.grad?.value; //Obtener los valores del formulario
      const { gra_type, gra_date, gra_time, gra_fkgroup} = this.grad.value; // Guardar los valores de Tipo, Fecha y Hora
      // MODIFICACIONES-----------------------------------------------------------
      const response = await axios.post('http://attendance.test/grade/crear', grad, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 100-token',
        }
      }).then( (response) => {//Llama la alerta en caso de exito
        if(response?.status == 200) {
          const { data } = response;

          const { id } = data;
          // MODIFICACIONES-----------------------------------------------------------
        this.gradeId = id; //GUARDAR EL ID DEL REGISTRO CREADO

        this.grad2.patchValue({
          graper_fkgrade: this.gradeId,
        });
        // MODIFICACIONES-----------------------------------------------------------
        this.alertGuardado('La calificación ha sido registrada');

        this.grad.reset(); // Reiniciar los valores del formulario
        this.grad.patchValue({ // Volver a asignar los valores guardados de Tipo, Fecha y Hora
          gra_type: gra_type,
          // MODIFICACIONES-----------------------------------------------------------
          gra_date: gra_date,
          gra_time: gra_time,
          gra_fkgroup: gra_fkgroup,
          // MODIFICACIONES-----------------------------------------------------------
        });

        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
          // MODIFICACIONES-----------------------------------------------------------
        this.alertGuardado(error?.response?.data[0]?.message, "Error");
        // MODIFICACIONES-----------------------------------------------------------
        }
    });
    } catch(e){
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
    private async alertGuardado(msg = "", subMsg = "Guardado") {
      const alert = await this.alert.create({
        header: 'Calificación', //Titulo de nuestra alerta
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

    // MODIFICACIONES-----------------------------------------------------------


    private formulario2() {
      // Crear el formulario reactivo con campos y validaciones
      this.grad2 = this.formBuilder.group({  
        graper_score: ['', [Validators.required]],
        graper_commit: ['', [Validators.required]],
        graper_fkperson: ['', [Validators.required]],
        graper_fkgrade: ['', [Validators.required]],
      });
    }


    async guardarDatos2() {
      try {
        const grad2 = this.grad2?.value; //Obtener los valores del formulario
        const { graper_fkgrade} = this.grad2.value; // Guardar los valores de Tipo, Fecha y Hora

        const response = await axios.post('http://attendance.test/grade-person/crear', grad2, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token',
          }
        }).then( (response) => {//Llama la alerta en caso de exito
          if(response?.status == 200) {

          this.alertGuardado('La calificación ha sido registrada');

          this.grad2.reset(); // Reiniciar los valores del formulario
           this.grad2.patchValue({
          //   graper_score: graper_score,
          //   graper_commit: graper_commit,
          //   graper_fkperson: graper_fkperson,
             graper_fkgrade: graper_fkgrade,
           });

          }
      }).catch( (error) => {
          if(error?.response?.status == 422) {
          this.alertGuardado(error?.response?.data[0]?.message, "Error");
          }
      });
      } catch(e){
      console.log(e);
      }
    }
}
// MODIFICACIONES-----------------------------------------------------------