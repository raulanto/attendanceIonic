import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  groups: any = [];
  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.cargarGroups();
  }
 
  async cargarGroups(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'GET',
      // Url de Monica, Zarate
      url: "http://attendancedb.test/group?expand=subject,teacher,classroom",
      // Url de Raul
      //url: "http://attendancedb1.test/group?expand=subject,teacher,classroom",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.groups = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }


}
