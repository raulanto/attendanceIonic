import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-elim-major',
  templateUrl: './elim-major.page.html',
  styleUrls: ['./elim-major.page.scss'],
})
export class ElimMajorPage  {

  items: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    
    
  ) { }

  major: any = [];
  ngOnInit() {
    this.loadMajors();
  }


  async loadMajors(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      // Url de Monica
      url: "http://attendancedb.test/major",
      // Url de Zarate
      //url: "http://attendancebd.test/major",
      // Url de Raul
      //url: "http://attendancedb1.test/major",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.major = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
