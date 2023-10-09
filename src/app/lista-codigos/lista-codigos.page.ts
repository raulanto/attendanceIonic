import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';
@Component({
	selector: 'app-lista-codigos',
	templateUrl: './lista-codigos.page.html',
	styleUrls: ['./lista-codigos.page.scss'],
})
export class ListaCodigosPage implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private loadingCtrl : LoadingController,
		private loading: LoadingController
	) { }
	codigos: any = [];
	ngOnInit() {
		this.cargarCodigo()
	}
	async cargarCodigo(event?: InfiniteScrollCustomEvent) {
		const loading = await this.loadingCtrl.create({
			message : 'Cargando',
			spinner : 'bubbles',
		});
		await loading.present();
		const response = await axios({
			method: 'get',
			url : "http://attendancedb.test/code",
			withCredentials: true,
			headers: {
				'Accept': 'application/json'
			}
		}).then( (response) => {
			this.codigos = response.data;
			event?.target.complete();
		}).catch(function (error) {
			console.log(error);
		});
		loading.dismiss();
	}
	

}
