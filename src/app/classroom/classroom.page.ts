import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})
export class ClassroomPage implements OnInit {
  classrooms: any = [];
  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.cargarClassrooms();
  }
 
  async cargarClassrooms(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url de Monica, Zarate
      url: "http://attendancedb.test/classroom",
      // Url de Raul
      //url: "http://attendancedb1.test/classroom",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.classrooms = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}
