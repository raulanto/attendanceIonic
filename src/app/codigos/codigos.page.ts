import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController, AlertController,ModalController } from '@ionic/angular';
import axios from 'axios';
import { GenerarCodigoPage } from '../generar-codigo/generar-codigo.page';

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
		private alertController: AlertController
	) {
		this.grupoid = this.route.snapshot.paramMap.get('grupoid');

	}
	codigos: any = [];
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
		const response = await axios({
			method: 'get',
			url: "http://attendancedb.test/code/codigos?id=" + this.grupoid,
			withCredentials: true,
			headers: {
				'Accept': 'application/json',
				//token Bearer 100-token
				'Authorization': 'Bearer 100-token'
			}
		}).then((response) => {
			this.codigos = response.data;
			event?.target.complete();
		}).catch(function (error) {
			console.log(error);
		});
		loading.dismiss();
	}

	mostrar() {
		console.log('Valor de grupoid en codigo:', this.grupoid);
	}
	async new() {
		// Crear una página modal utilizando el controlador de modales 
		const paginaModal = await this.modalCtrl.create({
			component: GenerarCodigoPage, // El componente que se mostrará en el modal
			breakpoints: [0, 0.3, 0.5, 0.95], // Configuración de puntos de quiebre
			initialBreakpoint: 0.95, // Ubicacion inicial del punto de quiebre
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
			buttons: ['OK']
		});

		await alert.present();
	}






}
