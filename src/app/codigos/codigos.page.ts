import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	InfiniteScrollCustomEvent,
	LoadingController,
	AlertController,
	ModalController,
} from '@ionic/angular';

import { GenerarCodigoPage } from '../generar-codigo/generar-codigo.page';
import { CodigoService } from '../services/codigo.service';





@Component({
	selector: 'app-codigos',
	templateUrl: './codigos.page.html',
	styleUrls: ['./codigos.page.scss'],
})
export class CodigosPage implements OnInit {
	public grupoid: any;

	constructor(
		private route: ActivatedRoute,
		private loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		private alertController: AlertController,
		private codigoService: CodigoService,

	) {
		this.grupoid = this.route.snapshot.paramMap.get('grupoid');
	}
	data: any = [];
	ngOnInit() {
		this.cargarCodigo();
		this.mostrar();
	}

	async cargarCodigo(event?: InfiniteScrollCustomEvent) {
		const loading = await this.loadingCtrl.create({
			message: 'Cargando',
			spinner: 'bubbles',
		});
		await loading.present();

		try {
			const response = await this.codigoService.codigos(this.grupoid).toPromise();
			this.data = response;
			event?.target.complete();
		} catch (error) {
			console.error('Error al cargar códigos:', error);
		} finally {
			loading.dismiss();
		}
	}


	mostrar() {
		console.log('Valor de grupoid en codigo:', this.grupoid);
	}
	async new() {
		// Crear una página modal utilizando el controlador de modales
		const paginaModal = await this.modalCtrl.create({
			component: GenerarCodigoPage, // El componente que se mostrará en el modal
			componentProps: {
				parametro: this.grupoid, // Puedes enviar cualquier tipo de dato
			},
			breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
			initialBreakpoint: 0.95, // Ubicación inicial del punto de quiebre
		});

		// Presentar la página modal en la interfaz de usuario
		await paginaModal.present();
	}
	async editar(code_id:number,code_fkgroup:number) {
		// Crear una página modal utilizando el controlador de modales
		const paginaModal = await this.modalCtrl.create({
			component: GenerarCodigoPage, // El componente que se mostrará en el modal
			componentProps: {
				parametro2: code_id,
				parametro:0,
				parametro3:code_fkgroup, // Puedes enviar cualquier tipo de dato
			},
			breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
			initialBreakpoint: 0.95, // Ubicación inicial del punto de quiebre
		});

		// Presentar la página modal en la interfaz de usuario
		await paginaModal.present();
	}



	async showDataAlert(codigo: any) {
		const alert = await this.alertController.create({
			header: 'Datos',
			subHeader: 'Código',
			message: `
			Hora: ${codigo.cod_time}<br>
			Fecha: ${codigo.cod_date}<br>
			Duración: ${codigo.cod_duration}`,
			buttons: ['OK'],
		});

		await alert.present();
	}




}
