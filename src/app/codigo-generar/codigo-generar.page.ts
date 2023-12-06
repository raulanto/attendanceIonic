import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodigoService } from '../services/codigo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-codigo-generar',
  templateUrl: './codigo-generar.page.html',
  styleUrls: ['./codigo-generar.page.scss'],
})
export class CodigoGenerarPage implements OnInit {
	public grupoid: number;
	public nuevoCodigo: any;
	public time: any;


	public codigo!: FormGroup; //Sirve para ingresar datos de "codigos"

	// Mensajes de validación para campos del formulario
	mensajes_validacion: any = {
		'cod_duration': [{ type: 'required', message: 'Tiempo requerido.' }],
	};

	constructor(
		private route: ActivatedRoute,
		private codigoService: CodigoService,
		private formBuilder: FormBuilder,
		private alert: AlertController,
		private router: Router,
		private navParams: NavParams,
		private modalCtrl: ModalController
	) {
		// Acceder al valor de 'grupoid' y asignarlo a la propiedad de clase 'grupoid'
		this.grupoid = this.navParams.get('parametro');
		console.log(this.grupoid);

	}

	private convertirHoraAMinutos(valorHora: string): number {
		const partesHora = valorHora.split(":");
		const horas = parseInt(partesHora[0], 10);
		const minutos = parseInt(partesHora[1], 10);
		return horas * 60 + minutos;
	}



	ngOnInit() {
		// this.mostrar();
		this.formulario();// Inicializar el formulario al cargar pagina
	}

	private formulario() {
		// Crear el formulario reactivo con campos y validaciones
		this.codigo = this.formBuilder.group({
			cod_fkgroup: [''],
			cod_duration: ['', [Validators.required]]
		});
	}


	async guardarDatos() {
		let codigos = this.codigo?.value; //Obtener los valores del formulario
		codigos.cod_fkgroup =Number(this.grupoid);
		codigos.cod_duration = this.convertirHoraAMinutos("01:00");
		console.log(codigos);
		try {
			await this.codigoService.generarCodigo(codigos).subscribe(
				async response => {
					if (response?.status == 200) {
						this.alertGuardado(response.data.cod_code, 'El archivo ' + response.data.cod_code + ' ha sido registrado');
						this.nuevoCodigo = response.data;
					} else if (response?.status === 400) {
						this.alertGuardado('Codigo no generado');


					}
				},
				error => {
					if (error.status == 422) {
						this.alertGuardado('Codigo no generado');
					}
				}
			);
		} catch (error) {
			console.log(error);
		}
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
		this.router.navigate(['codigo-generado']);
	}

}

