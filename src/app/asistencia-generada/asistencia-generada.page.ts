import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController,NavParams } from '@ionic/angular';
import { LoginPersonService } from '../services/login-person.service';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-asistencia-generada',
  templateUrl: './asistencia-generada.page.html',
  styleUrls: ['./asistencia-generada.page.scss'],
})
export class AsistenciaGeneradaPage implements OnInit {

  login!: FormGroup;

	public asistenciaGenerada: any;
  person:number;

  validation_messages:any = {
    'codigo': [
      { type: 'required', message: 'Codigo requerido.' },
      { type: 'minlength', message: 'Codigo debe contener al menos 10 caracteres.' },
    ],
    'comentario': [
      { type: 'required', message: 'Comentario requerido.' },
    ]
  }


  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private router: Router,
    private asistenciaService: AsistenciaService,
    private modalCtrl: ModalController,
    private navParams:NavParams
  ) { 
		this.person = this.navParams.get('parametro');

  }


  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.login = this.formBuilder.group({
      codigo: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.required
      ])],
      comentario: ['', Validators.compose([
        Validators.required
      ])],
      fklist: [''],
    });
  }
  
  async submitLogin() {
    let loginData = this.login?.value;
    loginData.fklist=this.person;
    try {
      await this.asistenciaService.guardar(loginData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            this.asistenciaGenerada = response.data;
            this.alertGuardado(response.data.code, this.asistenciaGenerada );
            this.recargarPagina();
          } else if( response?.data === '') {
            this.alertError();
          }
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertError() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Error',
      message: 'Codigo no registrada',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });

    await alert.present();
  }

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.login.get(controlName);
    if (control!.touched && control!.errors != null) {
      errors = JSON.parse(JSON.stringify(control!.errors));
    }
    return errors;
  }

  registrar() {
    this.router.navigate(['/registro']);
  }

	//método para reutilizar un alert
	private async alertGuardado(ID: String, msg = "", subMsg = "Guardado", data = 2) {
		const alert = await this.alertCtrl.create({
			header: 'Recurso', //Titulo de nuestra alerta
			subHeader: subMsg,
			message: msg,
			cssClass: 'alert-center',
			buttons: [
				{
					text: 'Salir',
					role: 'confirm',
					handler: () => {
						this.modalCtrl.dismiss();
						window.location.reload();
					},
				},
			],
		});
		await alert.present();
	}

	private recargarPagina() {
		const currentUrl = this.router.url;
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
		  this.router.navigate([currentUrl]);
		});
	  }
    customCounterFormatter(inputLength: number, maxLength: number) {
      return `${maxLength - inputLength} characters remaining`;
    }

}
