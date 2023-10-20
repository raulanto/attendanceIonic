import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-codigos',
  templateUrl: './codigos.page.html',
  styleUrls: ['./codigos.page.scss'],
})
export class CodigosPage implements OnInit {
	public grupoid: any;
	constructor(
		private route: ActivatedRoute,
		private loadingCtrl : LoadingController,
		private loading: LoadingController
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

	mostrar() {
		console.log('Valor de grupoid en codigo:', this.grupoid);
	}

	

}
