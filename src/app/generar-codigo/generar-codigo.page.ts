
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodigoService } from '../services/codigo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { RangeCustomEvent } from '@ionic/angular';
@Component({
	selector: 'app-generar-codigo',
	templateUrl: './generar-codigo.page.html',
	styleUrls: ['./generar-codigo.page.scss'],
})
export class GenerarCodigoPage implements OnInit {




	public grupoid: number;
	public cod_id: number;
	public code_fkgroup: number;


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
		this.cod_id = this.navParams.get('parametro2');
		this.code_fkgroup = this.navParams.get('parametro3');
		console.log(this.grupoid);

	}




	ngOnInit() {
		// this.mostrar();
		this.formulario();// Inicializar el formulario al cargar pagina
	}
	onIonChange(ev: Event) {
		this.time=(ev as RangeCustomEvent).detail.value
	}

	pinFormatter(value: number) {
		return `${value}mn`;
	}

	private formulario() {
		// Crear el formulario reactivo con campos y validaciones
		this.codigo = this.formBuilder.group({
			cod_fkgroup: [''],
			cod_duration: ['', [Validators.required]]
		});
	}


	async guardarDatos() {

		if (this.grupoid===0) {
			let codigos = this.codigo?.value; //Obtener los valores del formulario
			codigos.cod_fkgroup=this.code_fkgroup;
			console.log(codigos);
			console.log(codigos.cod_duration);
			try {
				await this.codigoService.generarCodigo(codigos,this.cod_id).subscribe(
					async response => {
						if (response?.status == 200) {
							this.nuevoCodigo = response.data;
							this.alertGuardado(response.data.cod_code, 'Se edito el codigo ' + this.nuevoCodigo.cod_duration + ' duracion nueva');
							this.recargarPagina();
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
		}else{
			let codigos = this.codigo?.value; //Obtener los valores del formulario
			codigos.cod_fkgroup=this.grupoid;
			console.log(codigos);
			console.log(codigos.cod_duration);
			try {
				await this.codigoService.generarCodigo(codigos).subscribe(
					async response => {
						if (response?.status == 200) {
							this.nuevoCodigo = response.data;
							this.alertGuardado(response.data.cod_code, 'El archivo ' + this.nuevoCodigo.cod_code + ' ha sido registrado');
							this.recargarPagina();
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
	private async alertGuardado(ID: String, msg = "", subMsg = "Guardado", data = 2) {
		const alert = await this.alert.create({
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



}
