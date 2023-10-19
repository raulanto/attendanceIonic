import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-extracurricular',
  templateUrl: './extracurricular.page.html',
  styleUrls: ['./extracurricular.page.scss'],
})
export class ExtracurricularPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading : LoadingController
  ) { }

  extra: any = null;

  ngOnInit() {
    this.loadExtra();
  }

  async loadExtra() {
    const extcode = this.route.snapshot.paramMap.get('extcode');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      //url: "http://attendancedb.test/extra-groups/"+extcode+"?expand=group, extracurricular",
      url: "http://attendancedb.test/extra-group/view?id="+extcode+"&expand=group, extracurricular,date,time,description,place",
      //url : "http://attendancedb.test/extra-group/?expand=group,extracurricular",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.extra = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}