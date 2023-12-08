import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent,
        LoadingController, 
        ModalController, 
        AlertController,
        Platform } from '@ionic/angular';
import { ActivatedRoute, 
          Router } from '@angular/router';        
import axios from 'axios';
import { NewextracurricularPage } from '../newextracurricular/newextracurricular.page';

@Component({
  selector: 'app-extra-alu',
  templateUrl: './extra-alu.page.html',
  styleUrls: ['./extra-alu.page.scss'],
})
export class ExtraAluPage implements OnInit {

  public grupoid: any;

  baseUrl: string = "http://attendancedb.test/extra-group/extragroups?id="
  eliminarUrl: string = "http://attendancedb.test/extra-group";

  extra: any = [];

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private router: Router,
  ) { 
    this.grupoid = this.route.snapshot.paramMap.get('grupoid');
  }

  mostrar() {
    console.log('Valor de grupoid en Eventos:', this.grupoid);
  }

  busqueda:string = '';
  page:number = 1;
  totalExtracurriculares:number = 0;

  ngOnInit() {
    this.mostrar();
    this.loadExtra();
    this.contarEventos();
  }

  async loadExtra(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    let urlApi:string = '';
    if(this.busqueda === '') {
      urlApi = `http://attendancedb.test/extra-group/extragroups?id=${this.grupoid}_expand=extracurricular&page=${this.page}`;
    } else {
      urlApi = `http://attendancedb.test/extra-group/extragroups?id=${this.grupoid}&text=${this.busqueda}&_expand=extracurricular`;
    }

    const response = await axios({
      method: 'get',
      //url : "http://attendancedb.test/extracurricular",
      //url: "http://attendancedb.test/extra-group/?expand=extracurricular,group,date,time,code,place",
      url : urlApi,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      this.extra = response.data;
      console.log(this.extra)
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    this.contarEventos();
    loading.dismiss();
  }



    async contarEventos() {
      let urlApi:string = '';
      if (this.busqueda === '') {
        //urlApi = 'http://attendancedb.test/extra-group/total';
        urlApi = `http://attendancedb.test/extra-group/total/?id=${this.grupoid}`;
      } else {
        //urlApi = 'http://attendancedb.test/extra-group/total/'+ this.busqueda;
        urlApi = `http://attendancedb.test/extra-group/total?id=${this.grupoid}&text=${this.busqueda}`;
      }
      const response = await axios({
          method: 'get',
          url : urlApi,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
          }
      }).then( (response) => {
          console.log(response);  
          this.totalExtracurriculares = response.data;
      }).catch(function (error) {
          console.log(error);     
      });
    }

  pagina(event:any) {
    this.page = event.target.innerText;
    this.loadExtra();
  }
  
  handleInput(event:any) {
    this.busqueda = event.target.value.toLowerCase();
    this.loadExtra();
  }

  private regresar() {
    this.router.navigate(['/tabs/notextracurricular']).then(() => {
      window.location.reload();
    });
  }
}