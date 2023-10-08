import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  librarys: any = [];
  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.cargarLibrarys();
  }
 
  async cargarLibrarys(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url de Monica
      url: "http://attendancedb.test/library?expand=group",
      // Url de Zarate
      //url: "http://attendancebd.test/library?expand=group",      
      // Url de Raul
      //url: "http://attendancedb1.test/library?expand=group",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.librarys = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }


}
