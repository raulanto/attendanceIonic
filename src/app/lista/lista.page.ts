import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
        LoadingController, 
        ModalController, 
        AlertController } from '@ionic/angular';
import { ActivatedRoute, 
        Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})

export class ListaPage implements OnInit {

	public grupoid: any;
  
	busqueda: string = '';
	page: number = 1;
	listas: any = [];
	totalAlumnos: number = 0;
	constructor(
		private route: ActivatedRoute,
		private loadingCtrl: LoadingController,
	) {
		//mandamos a pedir el id del grupo desde route paramMap
		this.grupoid = this.route.snapshot.paramMap.get('grupoid');
	}
	ngOnInit() {
		this.cargarAlumnos();
		this.contarAlumnos();
	}
	async cargarAlumnos(event?: InfiniteScrollCustomEvent) {
		const loading = await this.loadingCtrl.create({
			message: 'Cargando',
			spinner: 'bubbles',
		});
		await loading.present();

		let urlApi: string = '';

		if (this.busqueda === '') {
			urlApi = `http://attendance.test/listg/listas?id=${this.grupoid}&page=${this.page}`;
		} else {
			urlApi = `http://attendance.test/listg/buscar?text=${this.busqueda}&id=${this.grupoid}&expand=person&page=${this.page}`;
		}

		const response = await axios({
			method: 'get',
			url: urlApi,
			withCredentials: true,
			headers: {
				'Accept': 'application/json',
				// token Bearer 100-token
				'Authorization': 'Bearer 100-token'
			}
		}).then((response) => {
			this.listas = response.data;
			console.log(this.listas);
			
			event?.target.complete();
		}).catch(function (error) {
			console.log(error);
		});

		loading.dismiss();
		this.contarAlumnos();
	}

	async contarAlumnos() {
		let urlApi: string = '';

		if (this.busqueda === '') {
			urlApi = `http://attendance.test/listg/total?id=${this.grupoid}`;
		} else {
			urlApi = `http://attendance.test/listg/total?text=${this.busqueda}&id=${this.grupoid}`;
		}

		const response = await axios({
			method: 'get',
			url: urlApi,
			withCredentials: true,
			headers: {
				'Accept': 'application/json',
				// token Bearer 100-token
				'Authorization': 'Bearer 100-token'
			}
		}).then((response) => {
			console.log(response);
			this.totalAlumnos = response.data;
			console.log(this.totalAlumnos);
			
		}).catch(function (error) {
			console.log(error);
		});
	}

	pagina(event: any) {
		this.page = event.target.innerText;
		this.cargarAlumnos();
	}

	handleInput(event: any) {
		this.busqueda = event.target.value.toLowerCase();
		this.cargarAlumnos();
	}
}
