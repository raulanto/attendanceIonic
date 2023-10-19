import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notextracurricular',
  templateUrl: './notextracurricular.page.html',
  styleUrls: ['./notextracurricular.page.scss'],
})
export class NotextracurricularPage implements OnInit {

  constructor(
    private loadingCtrl : LoadingController,
  ) { }

  extra:any = [];

  ngOnInit() {
    this.loadExtra();
  }

  async loadExtra(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message : 'Cargando',
        spinner : 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        //url : "http://attendancedb.test/extracurricular",
        url : "http://attendancedb.test/extra-group/?expand=extracurricular,group",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.extra = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}
